export const dynamic = "force-dynamic";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { generateActivity } from "@/lib/api";

export default function HomePage() {
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
      <h1 className="text-3xl font-bold text-[#2E2E2E] mb-6">ElternHeld Generator</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl mx-auto">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Was möchtest du erstellen?"
          className="p-4 rounded-xl border border-gray-300 bg-white"
        />
        <select
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          className="p-4 rounded-xl border border-gray-300 bg-white"
        >
          <option value="gemini">Gemini</option>
          <option value="openai">OpenAI</option>
        </select>
        <button
          type="submit"
          className="p-4 bg-[#F58A7B] text-white font-bold rounded-xl hover:opacity-90"
        >
          Generieren
        </button>
      </form>
      {result && (
        <div className="mt-6 p-4 bg-white rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">Antwort:</h2>
          <p className="text-[#2E2E2E]">{result}</p>
        </div>
      )}
    </main>
  );
}
