import { createClient } from '@/lib/supabase/server';
import { Project } from '@/components/organisms/project';

interface ProjectPageProps {
  params: { projectId: string };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectId } = await params;
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const { data: project } = await supabase
    .from('tbl_projects')
    .select('*')
    .eq('id', projectId)
    .single();

  const { data, error } = await supabase
    .from('tbl_project_members')
    .select(
      `
      status, 
      created_at,
      user:user_id ( 
        id,
        full_name,
        email
      )
    `
    )
    // Filtramos para obtener solo las entradas de este proyecto
    .eq('project_id', projectId);
  // Opcional: Ordenamos por fecha de creación
  // .order('created_at', { ascending: true });

  // Procesamiento para separar miembros de pendientes en el frontend
  // const members = data?.filter((item) => item.status === 'member');
  // const pending = data?.filter((item) => item.status === 'pending');

  console.log(data, error);

  // TODO: Trabajar en esta excepción
  if (!project) {
    return (
      <>
        <h2>Proyecto no encontrado</h2>
        <p>El proyecto con ID {projectId} no existe.</p>
      </>
    );
  }

  return <Project project={project} userId={userData?.user?.id || ''} />;
}
