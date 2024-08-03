// middleware.ts

import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt"; // Import the getToken function
import type { NextRequest } from "next/server";

export default withAuth(
  async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Get the session token from the request
    const token = await getToken({ req });

    // Check if the user is signed in and verified
    if (token) {
      const isVerified = token.isVerified; // Access the isVerified field from the token

      // Redirect unverified users trying to access the dashboard
      if (!isVerified && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/auth/verify-email", req.url));
      }
    }

    // Allow request to continue if user is verified or the route doesn't require verification
    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/auth/sign-in",
    },
  }
);

// Configuration to apply middleware only to the /dashboard route
export const config = {
  matcher: ["/dashboard/:path*"],
};
