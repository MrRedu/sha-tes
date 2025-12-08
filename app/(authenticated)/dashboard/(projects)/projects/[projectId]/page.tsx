import { createClient } from '@/lib/supabase/server';
import { Project } from '@/components/organisms/project';

interface ProjectPageProps {
  params: { projectId: string };
}

export type User = {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectId } = await params;
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  const { data: project } = await supabase
    .from('tbl_projects')
    .select('*')
    .eq('id', projectId)
    .single();

  const { data: members } = await supabase
    .from('tbl_users')
    .select('id, email, full_name, avatar_url')
    .in('id', project?.members);

  const { data: pendingMembers } = await supabase
    .from('tbl_users')
    .select('id, email, full_name, avatar_url')
    .in('id', project?.pending_requests);

  // TODO: Trabajar en esta excepción
  if (!project) {
    return (
      <>
        <h2>Proyecto no encontrado</h2>
        <p>El proyecto con ID {projectId} no existe.</p>
      </>
    );
  }

  return (
    <div>
      <Project
        project={project}
        members={members}
        pendingMembers={pendingMembers}
        userId={userData?.user?.id || ''}
      />
    </div>
  );
}
