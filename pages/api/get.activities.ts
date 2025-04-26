// pages/api/generate-activity.ts
import { supabase } from "@/lib/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { prompt, provider } = req.body;

  if (!prompt || !provider) {
    return res.status(400).json({ error: "Missing prompt or provider" });
  }

  let result = "";
  if (provider === "openai") {
    result = `Fake OpenAI Antwort auf: ${prompt}`;
  } else {
    result = `Fake Gemini Antwort auf: ${prompt}`;
  }

  const { error } = await supabase.from("activities").insert([{ prompt, result, provider }]);
  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json({ result });
}
