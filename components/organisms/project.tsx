'use client';
import { AvatarGroup } from '@/components/molecules/avatar-group';
import { DialogManageUsers } from '@/components/molecules/dialog-manage-users';
import { Typography } from '@/components/ui/typography';
import { 
  useProjectDetails, 
  useProjectMutations, 
  useMemberMutations, 
  useNotebookMutations 
} from '@/hooks/use-projects';
import { DialogDeleteProject } from '../molecules/dialog-delete-project';
import type { User, Notebook, Member } from '@/types/types';
import { DialogCreateNotebook } from '../molecules/dialog-create-notebook';
import { DialogManageProject } from '../molecules/dialog-manage-project';
import { CardNotebook } from '../molecules/card-notebook';
import { EmptyState } from './empty-state';
import { FilePlusCorner, Loader2 } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card';

export interface ProjectProps {
  userId: User['id'];
  projectId: string;
}

export const Project = ({ userId, projectId }: ProjectProps) => {
  const { data: project, isLoading, error } = useProjectDetails(projectId);
  const { 
    form: formEditProject, 
    onSubmit: onSubmitEditProject, 
    deleteProject 
  } = useProjectMutations(projectId, project);
  
  const { updateMemberStatus, removeMember } = useMemberMutations(projectId);
  
  const { 
    form: formCreateNotebook, 
    onSubmit: onSubmitCreateNotebook 
  } = useNotebookMutations(projectId);

  if (isLoading) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !project) {
    return <div>Error al cargar el proyecto</div>;
  }

  const currentMembers = project.members.filter((m: Member) => m.status === 'member');
  const pendingMembers = project.members.filter((m: Member) => m.status === 'pending');

  return (
    <section className="space-y-4 p-4 md:p-6">
      <div className="w-full flex items-center md:justify-between flex-col md:flex-row gap-4">
        <div className="flex gap-2 items-center w-full justify-start">
          <HoverCard openDelay={10} closeDelay={100}>
            <HoverCardTrigger>
              <Typography variant="h1" className="text-2xl!">
                {project.title}
              </Typography>
            </HoverCardTrigger>
            {project.description && (
              <HoverCardContent side="bottom" align="start">
                <Typography
                  variant="p"
                  className="text-sm leading-relaxed text-muted-foreground mt-0! text-pretty"
                >
                  {project.description}
                </Typography>
              </HoverCardContent>
            )}
          </HoverCard>
          <AvatarGroup members={currentMembers} />
        </div>

        <div className="flex gap-2 w-full justify-end">
          <DialogManageProject form={formEditProject} onSubmit={onSubmitEditProject} />
          <DialogManageUsers
            joinCode={project.join_code}
            isProjectOwner={project.owner_id === userId}
            projectOwnerId={project.owner_id}
            currentMembers={currentMembers}
            pendingMembers={pendingMembers}
            onRemoveMember={(id: string) => removeMember(id)}
            onAccept={(id: string) => updateMemberStatus({ userId: id, status: 'member' })}
            onReject={(id: string) => removeMember(id)}
          />
          <DialogDeleteProject projectTitle={project.title} deleteProject={() => deleteProject()} />
        </div>
      </div>
      
      {project.notebooks?.length === 0 && (
        <section className="w-full flex items-center justify-center min-h-[calc(100vh-200px)]">
          <EmptyState
            icon={FilePlusCorner}
            title="Sin notebooks aún"
            description="No has creado ningún notebook dentro de tu proyecto. Comienza creando tu primer notebook."
            action={
              <DialogCreateNotebook form={formCreateNotebook} onSubmit={onSubmitCreateNotebook} />
            }
          />
        </section>
      )}

      {project.notebooks?.length > 0 && (
        <div className="w-full grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {project.notebooks.map((notebook: Notebook) => (
            <CardNotebook
              key={notebook.id}
              projectId={project.id}
              notebookId={notebook.id}
              name={notebook.name}
              description={notebook.description}
            />
          ))}
          <DialogCreateNotebook form={formCreateNotebook} onSubmit={onSubmitCreateNotebook} />
        </div>
      )}
    </section>
  );
};
