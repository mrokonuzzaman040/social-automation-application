import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { accessToken, recipientUrn, message } = req.body;

  try {
    const response = await axios.post(
      "https://api.linkedin.com/v2/messages",
      {
        recipients: [`urn:li:person:${recipientUrn}`],
        subject: "Automated Message",
        body: message,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "X-Restli-Protocol-Version": "2.0.0",
        },
      }
    );

    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.error("Error sending LinkedIn message:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
}
