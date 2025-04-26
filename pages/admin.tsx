// pages/admin.tsx

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { getAllActivities } from "@/lib/api";
import ActivityCard from "@/components/ActivityCard";

type Activity = {
  id: string;
  prompt: string;
  result: string;
  provider: string;
  created_at: string;
};

export default function AdminPage() {
  const { user } = useUser();
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    if (user) {
      getAllActivities().then((data) => {
        setActivities(data);
      });
    }
  }, [user]);

  return (
    <main className="min-h-screen bg-[#FFF6EC] p-6">
      <h1 className="text-3xl font-bold text-[#2E2E2E] mb-6">Admin Panel</h1>
      <div className="grid grid-cols-1 gap-4">
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </main>
  );
}
