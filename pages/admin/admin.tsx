"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { getAllActivities } from "@/lib/api";
import { useUser } from "@clerk/nextjs";

type Activity = {
  id: string;
  prompt: string;
  result: string;
  provider: string;
};

const ADMIN_EMAIL = "elternheld@gmail.com";

export default function AdminPage() {
  const { user } = useUser();
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    async function fetchActivities() {
      if (user?.primaryEmailAddress?.emailAddress === ADMIN_EMAIL) {
        const data = await getAllActivities();
        setActivities(data);
      }
    }
    fetchActivities();
  }, [user]);

  if (!user || user.primaryEmailAddress?.emailAddress !== ADMIN_EMAIL) {
    return <main className="min-h-screen p-6">Kein Zugriff.</main>;
  }

  return (
    <main className="min-h-screen bg-[#FFF6EC] p-6">
      <h1 className="text-3xl text-[#2E2E2E] font-bold mb-6">Admin Bereich</h1>
      <div className="flex flex-col gap-4">
        {activities.map((activity) => (
          <div key={activity.id} className="p-4 bg-white rounded-xl shadow-md">
            <p><b>Prompt:</b> {activity.prompt}</p>
            <p><b>Antwort:</b> {activity.result}</p>
            <p><b>Provider:</b> {activity.provider}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
