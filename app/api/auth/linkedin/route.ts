import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import querystring from "querystring";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query;

  if (!code) {
    const scope = "r_liteprofile r_emailaddress w_member_social";
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.LINKEDIN_CLIENT_ID}&redirect_uri=${process.env.LINKEDIN_REDIRECT_URI}&state=foobar&scope=${scope}`;
    return res.redirect(authUrl);
  }

  try {
    const tokenResponse = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      querystring.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token } = tokenResponse.data;

    // Store the access token in a session or database for later use
    // For this example, we're redirecting to a dashboard page
    res.redirect(`/dashboard?token=${access_token}`);
  } catch (error) {
    console.error("LinkedIn authentication error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
}
