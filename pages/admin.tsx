// pages/admin.tsx
import { useUser } from "@clerk/nextjs";
import { getAllActivities } from "@/lib/api";
import ActivityCard from "@/components/ActivityCard";

export default function AdminPage() {
  const { user } = useUser();
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    async function fetchActivities() {
      const data = await getAllActivities();
      setActivities(data);
    }
    fetchActivities();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <main className="p-6 bg-[#FFF6EC] min-h-screen">
      <h1 className="text-3xl font-bold text-[#2E2E2E] mb-4">Adminbereich</h1>
      <div className="grid grid-cols-1 gap-4">
        {activities.map((activity) => (
          <ActivityCard key={activity.id} {...activity} />
        ))}
      </div>
    </main>
  );
}
