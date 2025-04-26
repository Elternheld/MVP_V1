// pages/history.tsx
import { useUser } from "@clerk/nextjs";
import { getOwnActivities } from "@/lib/api";
import ActivityCard from "@/components/ActivityCard";

export default function HistoryPage() {
  const { user } = useUser();
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    async function fetchActivities() {
      const data = await getOwnActivities();
      setActivities(data);
    }
    fetchActivities();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <main className="p-6 bg-[#FFF6EC] min-h-screen">
      <h1 className="text-3xl font-bold text-[#2E2E2E] mb-4">Dein Verlauf</h1>
      <div className="grid grid-cols-1 gap-4">
        {activities.map((activity) => (
          <ActivityCard key={activity.id} {...activity} />
        ))}
      </div>
    </main>
  );
}
