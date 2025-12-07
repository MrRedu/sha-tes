import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { createClient } from '@/lib/supabase/server';

export default async function ProjectPage({
  params,
}: {
  params: { projectId: string };
}) {
  const supabase = await createClient();

  const { data: project } = await supabase
    .from('tbl_projects')
    .select('*')
    .eq('id', params.projectId)
    .single();

  const { data: notepads } = await supabase
    .from('tbl_notepads')
    .select('*')
    .eq('project_id', params.projectId);

  // TODO: Trabajar en esta excepción
  if (!project) {
    return (
      <>
        <h2>Proyecto no encontrado</h2>
        <p>El proyecto con ID {params.projectId} no existe.</p>
      </>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{project.name}</h2>
      <p>Miembros</p>
      {project.members.length === 1 && (
        <Avatar>
          <AvatarImage
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${project.members[0]}`}
            alt={project.members[0]}
          />
          <AvatarFallback>
            {project.members[0].slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )}
      {project.members.length > 1 && (
        <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2">
          {/* TODO */}
          {project.members.map((member: string[]) => (
            <Avatar key={member.toString()}>
              <AvatarImage
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${member}`}
                alt={member.toString()}
              />
              <AvatarFallback>HP</AvatarFallback>
            </Avatar>
          ))}
        </div>
      )}
      <p>Dueño: {project.owner_id}</p>
      <code>Código de invitación: {project.join_code}</code>
      <p>Miembros pendientes:</p>
      {project.pending_requests.length > 0 ? (
        <ul>
          {project.pending_requests.map((pending: string) => (
            <li key={pending}>{pending}</li>
          ))}
        </ul>
      ) : (
        <p>No hay miembros pendientes.</p>
      )}
      {/* <pre>{JSON.stringify(project, null, 2)}</pre> */}
      <br />
      <br />
      <br />
      <h3>Blocs de notas</h3>
      <pre>{JSON.stringify(notepads, null, 2)}</pre>
    </div>
  );
}
