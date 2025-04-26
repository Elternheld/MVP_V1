// lib/api.ts
import { supabase } from "./supabase";

export async function generateActivity(prompt: string, provider: string) {
  const response = await fetch("/api/generate-activity", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, provider }),
  });
  const data = await response.json();
  return data.result;
}

export async function getOwnActivities() {
  const { data, error } = await supabase.from("activities").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function getAllActivities() {
  const { data, error } = await supabase.from("activities").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}
