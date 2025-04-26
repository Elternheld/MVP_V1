// components/ActivityCard.tsx

type Activity = {
  id: string;
  prompt: string;
  result: string;
  provider: string;
  created_at: string;
};

type ActivityCardProps = {
  activity: Activity;
};

export default function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-md">
      <p className="text-gray-800">
        <b>Prompt:</b> {activity.prompt}
      </p>
      <p className="text-gray-800">
        <b>Result:</b> {activity.result}
      </p>
      <p className="text-gray-600 text-sm">
        <b>Provider:</b> {activity.provider}
      </p>
      <p className="text-gray-400 text-xs">
        <b>Created:</b> {new Date(activity.created_at).toLocaleString()}
      </p>
    </div>
  );
}
