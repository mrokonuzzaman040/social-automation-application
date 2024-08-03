import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { sendVerificationEmail } from "@/lib/mailer";

// Function to handle POST requests for user signup
export async function POST(req: NextRequest) {
  try {
    // Parse the request body to get the user details
    const { name, email, password } = await req.json();

    await dbConnect();

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

    // Get the timestamp and the IP address of the requester
    const timestamp = new Date();
    const ipAddress =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("remote-address") ||
      "unknown";

    // Create a new user with all required fields
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      verificationCode,
      isVerified: false,
      timestamp,
      ipAddress,
    });

    // Debug: Log the user data before saving to verify all fields
    console.log("New User Data:", newUser);

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
