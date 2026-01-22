import { createClient } from '@/lib/supabase/server';
import { Notebook } from '@/components/organisms/notebook';
import { BreadcrumbRegistry } from '@/context/breadcrumb-context';

interface NotebookPageProps {
  params: { projectId: string; notebookId: string };
}

export default async function NotebookPage({ params }: NotebookPageProps) {
  const { projectId, notebookId } = await params;
  const supabase = await createClient();

  const { data: userData } = await supabase.auth.getUser();
  const userId = userData?.user?.id || '';

  // Fetch notebook with notes (ordered by position) and also project for the breadcrumb
  const { data: notebook, error: notebookError } = await supabase
    .from('tbl_notebooks')
    .select(
      `
      *,
      creator:creator_id ( id, full_name, avatar_url ),
      notes:tbl_notes ( * ),
      project:tbl_projects ( id, title )
    `
    )
    .eq('id', notebookId)
    .order('position', { foreignTable: 'tbl_notes', ascending: true })
    .single();

  if (notebookError) {
    console.error('Error cargando el notebook:', notebookError.message);
  }

  if (!notebook) {
    return (
      <>
        <h2>Notebook no encontrado</h2>
        <p>El notebook con ID {notebookId} no existe.</p>
      </>
    );
  }

  return (
    <>
      {/* Registramos ambos para asegurar que el Header tenga toda la info */}
      <BreadcrumbRegistry id={projectId} label={notebook.project?.title || ''} />
      <BreadcrumbRegistry id={notebook.id} label={notebook.name} />

      <Notebook _notebook={notebook} userId={userId} projectId={projectId} />
    </>
  );
}
