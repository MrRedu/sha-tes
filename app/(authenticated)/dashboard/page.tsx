import { Metadata } from 'next';
import { HeaderDashboard } from './_components/header-dashboard';
import { CurrentProjects } from './_components/current-projects';
import { RecentActivity } from './_components/recent-activity';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function DashboardPage() {
  return (
    <section className="grid grid-cols-12 max-w-7xl mx-auto">
      <div className="col-span-12 md:col-span-8 bg-background flex flex-col gap-6 p-4 md:p-6">
        <HeaderDashboard />
        <CurrentProjects />
      </div>
      <div className="col-span-12 md:col-span-4 border-l p-4 md:p-6">
        <RecentActivity />
      </div>
    </section>
  );
}
