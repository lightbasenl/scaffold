import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (process.env.ALLOW_ROBOTS === "true") {
    return res.send(`User-agent: *
Allow: /`);
  } else {
    return res.send(`User-agent: *
Disallow: /`);
  }
}
