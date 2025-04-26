// pages/index.tsx
import { useUser } from "@clerk/nextjs";
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
    <main className="p-6 bg-[#FFF6EC] min-h-screen">
      <h1 className="text-3xl font-bold text-[#2E2E2E] mb-6">ElternHeld Generator</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl mx-auto">
        <textarea
          className="border p-2 rounded-xl"
          placeholder="Dein Prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <select className="border p-2 rounded-xl" value={provider} onChange={(e) => setProvider(e.target.value)}>
          <option value="gemini">Gemini</option>
          <option value="openai">OpenAI</option>
        </select>
        <button type="submit" className="bg-[#F58A7B] p-2 rounded-xl text-white hover:opacity-90">Generieren</button>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-white rounded-xl shadow-md">
          <h2 className="text-2xl mb-2 font-bold text-[#2E2E2E]">Antwort:</h2>
          <p>{result}</p>
        </div>
      )}
    </main>
  );
}
