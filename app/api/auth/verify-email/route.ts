import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { code, email } = await req.json();

    if (!code || !email) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Find the user with the given email and verification code
    const user = await User.findOne({ email, verificationCode: code });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid code or email" },
        { status: 400 }
      );
    }

    // Update the user as verified using update method to avoid validation error
    await User.updateOne(
      { email },
      { $set: { isVerified: true, verificationCode: null } }
    );

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
