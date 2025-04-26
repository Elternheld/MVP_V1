export const dynamic = "force-dynamic";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { generateActivity } from "@/lib/api";

export default function Home() {
  const { user } = useUser();
  const [prompt, setPrompt] = useState("");
  const [provider, setProvider] = useState("gemini");
  const [result, setResult] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt) return;
    const generated = await generateActivity(prompt, provider);
    setResult(generated);
  }

  return (
    <main className="min-h-screen bg-[#FFF6EC] p-6">
      <h1 className="text-3xl text-[#2E2E2E] font-bold mb-6">ElternHeld Generator</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl mx-auto">
        <textarea
          className="p-4 rounded-xl border border-gray-300"
          placeholder="Schreibe hier deinen Prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <select
          className="p-4 rounded-xl border border-gray-300"
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
        >
          <option value="gemini">Gemini</option>
          <option value="openai">OpenAI</option>
        </select>
        <button
          type="submit"
          className="p-4 bg-[#F58A7B] text-white rounded-xl shadow-md hover:opacity-90"
        >
          Generieren
        </button>
      </form>
      {result && (
        <div className="mt-10 p-6 bg-white rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">Antwort:</h2>
          <p>{result}</p>
        </div>
      )}
    </main>
  );
}
