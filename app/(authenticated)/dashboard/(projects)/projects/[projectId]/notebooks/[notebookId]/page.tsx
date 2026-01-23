import { createClient } from '@/lib/supabase/server';
import { BreadcrumbRegistry } from '@/context/breadcrumb-context';
import { NotebookClient } from './_components/notebook-client';
import { actions } from '@/actions';
import { getQueryClient } from '@/lib/get-query-client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

interface NotebookPageProps {
  params: { projectId: string; notebookId: string };
}

export default async function NotebookPage({ params }: NotebookPageProps) {
  const { projectId, notebookId } = await params;
  const supabase = await createClient();

  const { data: userData } = await supabase.auth.getUser();
  const userId = userData?.user?.id || '';

  const queryClient = getQueryClient();

  // Prefetch notebook details
  await queryClient.prefetchQuery({
    queryKey: ['notebook', notebookId],
    queryFn: async () => {
      const { notebook, error } = await actions.notebooks.fetchNotebookById(notebookId);
      if (error) throw new Error(error);
      return notebook;
    },
  });

  const notebook = queryClient.getQueryData(['notebook', notebookId]) as any;

  if (!notebook) return notFound();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* Breadcrumbs */}
      <BreadcrumbRegistry id={projectId} label={notebook.project?.title || ''} />
      <BreadcrumbRegistry id={notebook.id} label={notebook.name} />

      <NotebookClient projectId={projectId} notebookId={notebookId} />
    </HydrationBoundary>
  );
}
