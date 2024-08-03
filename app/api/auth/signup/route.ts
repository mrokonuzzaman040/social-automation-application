// pages/api/auth/signup.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User, { IUser } from "@/models/User";
import { sendVerificationEmail } from "@/lib/mailer";

// Function to handle POST requests for user signup
export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  await dbConnect();

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      ); // Conflict
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a random 6-digit verification code
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Create a new user
    const newUser: IUser = new User({
      name,
      email,
      password: hashedPassword,
      verificationCode,
      isVerified: false,
    });
    await newUser.save();

    // Send verification email
    await sendVerificationEmail(email, verificationCode);

    return NextResponse.json(
      { message: "User created successfully. Verification email sent." },
      { status: 201 }
    ); // Created
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
