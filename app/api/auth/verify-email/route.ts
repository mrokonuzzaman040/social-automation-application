import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb"; // Function to connect to MongoDB
import User from "@/models/User"; // Mongoose User model

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect(); // Ensure connection to the database

  if (req.method === "POST") {
    const { code } = req.body;

    try {
      // Find user with the given verification code
      const user = await User.findOne({ verificationCode: code });

      if (!user) {
        return res.status(400).json({ error: "Invalid verification code" });
      }

      // Mark user as verified and clear the verification code
      user.isVerified = true;
      user.verificationCode = null;
      await user.save();

      res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
      console.error("Verification error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
