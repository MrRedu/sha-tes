import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
    </div>
  );
}
