import { createClient } from '@/lib/supabase/server';
import { Project } from '@/components/organisms/project';
import { type PostgrestSingleResponse } from '@supabase/supabase-js';
import type { ProjectResponse } from '@/types/types';

interface ProjectPageProps {
  params: { projectId: string };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectId } = await params;
  const supabase = await createClient();

  const { data: userData } = await supabase.auth.getUser();
  const userId = userData?.user?.id || '';

  const {
    data: project,
    error: projectError,
  }: PostgrestSingleResponse<ProjectResponse> = await supabase
    .from('tbl_projects')
    .select(
      `
        *,
        members:tbl_project_members (
          status,
          profile:tbl_users (
            id,
            full_name,
            avatar_url,
            email
          )
        )
      `
    )
    .eq('id', projectId)
    .single();

  if (projectError) {
    console.error('Error cargando el proyecto:', projectError.message);
  }

  // TODO: Trabajar en esta excepción
  if (!project) {
    return (
      <>
        <h2>Proyecto no encontrado</h2>
        <p>El proyecto con ID {projectId} no existe.</p>
      </>
    );
  }

  return <Project project={project} userId={userId} />;
}
