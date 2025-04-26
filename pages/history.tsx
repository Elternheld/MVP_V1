export const dynamic = "force-dynamic";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { getOwnActivities } from "@/lib/api";
import { ActivityCard } from "@/components/ActivityCard";

export default function HistoryPage() {
  const { user } = useUser();
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    async function fetchActivities() {
      if (user?.id) {
        const data = await getOwnActivities();
        setActivities(data);
      }
    }
    fetchActivities();
  }, [user]);

  return (
    <main className="min-h-screen bg-[#FFF6EC] p-6">
      <h1 className="text-3xl font-bold text-[#2E2E2E] mb-6">Meine Aktivitäten</h1>
      <div className="grid grid-cols-1 gap-4">
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </main>
  );
}
