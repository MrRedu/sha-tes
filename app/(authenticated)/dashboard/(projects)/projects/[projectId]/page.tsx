import { AvatarGroup } from '@/components/molecules/avatar-group';
import { DialogManageUsers } from '@/components/molecules/dialog-manage-users';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { createClient } from '@/lib/supabase/server';
import { Trash2Icon } from 'lucide-react';

interface ProjectPageProps {
  params: { projectId: string };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectId } = await params;
  const supabase = await createClient();

  const { data: project } = await supabase
    .from('tbl_projects')
    .select('*')
    .eq('id', projectId)
    .single();

  const { data: users } = await supabase
    .from('tbl_users')
    .select('*')
    .eq('id', project.pending_requests);

  // TODO: Hay que agregar lo del RLS para que esto devuelva los usuarios pendientes
  console.log(users);

  // const { data: notepads } = await supabase
  //   .from('tbl_notepads')
  //   .select('*')
  //   .eq('project_id', params.projectId);

  // TODO: Trabajar en esta excepción
  if (!project) {
    return (
      <>
        <h2>Proyecto no encontrado</h2>
        <p>El proyecto con ID {params.projectId} no existe.</p>
      </>
    );
  }

  const AvatarTest = [{ name: 'John Doe', imageUrl: undefined }];
  const AvatarTest2 = [
    { name: 'Alice Wonderland', imageUrl: undefined },
    { name: 'Bob Builder', imageUrl: undefined },
    { name: 'Charlie Chaplin', imageUrl: undefined },
  ];

  return (
    <div>
      <div className="w-full flex items-center justify-between mb-4 flex-col md:flex-row gap-4">
        <div className="flex gap-2">
          <Typography variant="h3">{project.name}</Typography>
          <AvatarGroup members={AvatarTest2} />
        </div>
        <div className="flex gap-2">
          <DialogManageUsers
            joinCode={project.join_code}
            pendingMembers={project.pending_requests}
          />
          <Button variant="destructive" size="icon">
            <Trash2Icon />
          </Button>
        </div>
      </div>
      {/* <pre>{JSON.stringify(project, null, 2)}</pre> */}
      {/* <br />
      <br />
      <br />
      <h3>Notepads</h3>
      <pre>{JSON.stringify(notepads, null, 2)}</pre> */}
    </div>
  );
}
