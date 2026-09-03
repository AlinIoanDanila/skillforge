"use client";

import StatsCards from "@/components/stats-cards";
import { useUser } from "@/features/auth/user-context";
import { UpcomingTasks } from "@/components/dashboard/upcoming-tasks";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

export default function DashboardPage() {
  const user = useUser();

  return (
    <DashboardLayout title="Dashboard">
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Welcome back, {user?.name}</h2>
          <p className="mt-1 text-muted-foreground">Here&apos;s an overview of your progress and upcoming tasks.</p>
        </div>

        <StatsCards />

        <div className="grid gap-6 lg:grid-cols-2">
          <RecentActivity />
          <UpcomingTasks />
        </div>
      </div>
    </DashboardLayout>
  );
}
