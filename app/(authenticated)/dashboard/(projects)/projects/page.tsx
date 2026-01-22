import { createClient } from '@/lib/supabase/server';

import { type Metadata } from 'next';
import { ProjectsClient } from './_components/projects-client';

export const metadata: Metadata = {
  title: 'Proyectos',
};

const PROJECTS_QUERY = `
  id,
  title,
  description,
  owner_id,
  join_code,
  updated_at,
  created_at,
  status, 
  priority,
  members:tbl_project_members (
    status,
    ...tbl_users (
      id,
      full_name,
      avatar_url,
      email,
      created_at
    )
  )
`;

export default async function ProjectsPage() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData?.user?.id;

  const { data: projects, error: projectsError } = await supabase
    .from('tbl_projects')
    .select(PROJECTS_QUERY)
    .order('updated_at', { ascending: false });

  const { data: pendingProjectsRequests, error: pendingProjectsError } =
    await supabase.rpc('get_pending_projects');

  const activeProjects = projects?.filter((project) => {
    // 1. Si el usuario es el dueño, SIEMPRE lo incluimos.
    if (project.owner_id === userId) return true;

    // 2. Buscamos si el usuario es un miembro ACTIVO dentro del array anidado.
    const membership = project.members?.find((member) => member.id === userId);

    // Lo incluimos solo si el estado es 'member'
    return membership?.status === 'member';
  });

  if (projectsError) {
    console.error('Error cargando proyectos:', projectsError.message);
  }

  if (pendingProjectsError) {
    console.error('Error cargando proyectos pendientes:', pendingProjectsError.message);
  }

  return (
    <ProjectsClient
      _projects={activeProjects || []}
      _pendingProjectsRequests={pendingProjectsRequests || []}
    />
  );
}
