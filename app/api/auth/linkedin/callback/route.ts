import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code, state } = req.query;

  if (!code || !state) {
    return res.status(400).send("Invalid request.");
  }

  // Redirect to the LinkedIn auth handler to exchange code for access token
  res.redirect(`/api/auth/linkedin?code=${code}`);
}
