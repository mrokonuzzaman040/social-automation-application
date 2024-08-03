import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import querystring from "querystring";

async function exchangeCodeForToken(code: string): Promise<string> {
  const response = await axios.post(
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

  return response.data.access_token;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Authorization code missing" },
      { status: 400 }
    );
  }

  try {
    const accessToken = await exchangeCodeForToken(code);
    // Store the access token securely (e.g., in a session or database)
    // Redirect to a dashboard or homepage with access token
    return NextResponse.redirect(`/dashboard?token=${accessToken}`);
  } catch (error) {
    console.error("Error exchanging code for token:", error);
    return NextResponse.json(
      { error: "Failed to exchange code for token" },
      { status: 500 }
    );
  }
}
