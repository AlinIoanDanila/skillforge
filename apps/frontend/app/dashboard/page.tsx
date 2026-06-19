import StatsCards from "@/components/stats-cards";
import { UpcomingTasks } from "@/components/dashboard/upcoming-tasks";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

export default function DashboardPage() {
  return (
    <DashboardLayout title="Dashboard">
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Welcome back, Alex</h2>
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
