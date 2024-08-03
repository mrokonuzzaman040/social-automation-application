import axios from "axios";
import querystring from "querystring";

// Complete code exchange in the same or a separate function
async function exchangeCodeForToken(code: string) {
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
    return access_token;
  } catch (error) {
    console.error("Error exchanging code for token:", error);
    throw new Error("Failed to exchange code for access token");
  }
}

export default exchangeCodeForToken;