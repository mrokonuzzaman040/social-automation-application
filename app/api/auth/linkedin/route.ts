import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    const scope = "r_liteprofile r_emailaddress w_member_social";
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.LINKEDIN_CLIENT_ID}&redirect_uri=${process.env.LINKEDIN_REDIRECT_URI}&state=foobar&scope=${scope}`;
    return NextResponse.redirect(authUrl);
  }

  return NextResponse.json(
    { error: "Code not expected here directly" },
    { status: 400 }
  );
}
