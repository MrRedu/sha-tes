import { type Metadata } from 'next';
import { ProjectsClient } from './_components/projects-client';
import { PROJECTS_ITEMS_PER_PAGE } from '@/lib/constants';
import { actions } from '@/actions';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/get-query-client';

export const metadata: Metadata = {
  title: 'Proyectos',
};

export default async function ProjectsPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['projects', { limit: PROJECTS_ITEMS_PER_PAGE }],
    queryFn: async () => {
      const { projects, error } = await actions.projects.fetchProjects(
        0,
        PROJECTS_ITEMS_PER_PAGE - 1
      );
      if (error) throw new Error(error);
      return projects;
    },
    initialPageParam: 0,
  });

  await queryClient.prefetchQuery({
    queryKey: ['pending-projects'],
    queryFn: async () => {
      const { pendingProjects, error } = await actions.projects.fetchPendingProjects();
      if (error) throw new Error(error);
      return pendingProjects;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectsClient />
    </HydrationBoundary>
  );
}
