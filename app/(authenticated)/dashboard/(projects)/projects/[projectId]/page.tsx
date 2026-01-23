import { Project } from '@/components/organisms/project';
import { BreadcrumbRegistry } from '@/context/breadcrumb-context';
import { getQueryClient } from '@/lib/get-query-client';
import { actions } from '@/actions';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

interface ProjectPageProps {
  params: Promise<{ projectId: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectId } = await params;
  const queryClient = getQueryClient();
  const supabase = await createClient();

  const { data: userData } = await supabase.auth.getUser();
  const userId = userData?.user?.id || '';

  // Prefetch Project Details
  await queryClient.prefetchQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      const { project, error } = await actions.projects.fetchProjectById(projectId);
      if (error) throw new Error(error);
      return project;
    },
  });

  const project = queryClient.getQueryData(['project', projectId]) as any;

  if (!project) {
    return notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BreadcrumbRegistry id={project.id} label={project.title} />
      <Project projectId={projectId} userId={userId} />
    </HydrationBoundary>
  );
}
