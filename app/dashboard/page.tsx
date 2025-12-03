import { EmptyProjects } from '@/components/organisms/empty-projects';

export default function DashboardPage() {
  // projects.length > 0;
  const ARE_ANY_PROJECTS = false;

  if (ARE_ANY_PROJECTS) {
    return <div>Dashboard with projects</div>;
  }

  return (
    <>
      <EmptyProjects />
    </>
  );
}
