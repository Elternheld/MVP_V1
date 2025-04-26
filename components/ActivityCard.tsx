// components/ActivityCard.tsx
interface ActivityCardProps {
  prompt: string;
  result: string;
  provider: string;
}

export default function ActivityCard({ prompt, result, provider }: ActivityCardProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <p><b>Prompt:</b> {prompt}</p>
      <p><b>Result:</b> {result}</p>
      <p><b>Provider:</b> {provider}</p>
    </div>
  );
}
