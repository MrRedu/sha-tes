'use client';

import { AvatarGroup } from '@/components/molecules/avatar-group';
import { DialogManageUsers } from '@/components/molecules/dialog-manage-users';
import { Typography } from '@/components/ui/typography';
import { useProject } from '@/hooks/use-projects';
import { DialogDeleteProject } from '../molecules/dialog-delete-project';
import type { ProjectWithMembersAndNotebooks, User } from '@/types/types';
import { DialogCreateNotebook } from '../molecules/dialog-create-notebook';
import { DialogManageProject } from '../molecules/dialog-manage-project';
import { CardNotebook } from '../molecules/card-notebook';
import { EmptyState } from './empty-state';
import { FilePlusCorner } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../ui/hover-card';

export interface ProjectProps {
  userId: User['id'];
  _project: ProjectWithMembersAndNotebooks;
}

export const Project = ({ userId, _project }: ProjectProps) => {
  const {
    project,
    notebooks,

    // Project properties
    projectName,
    projectDescription,
    // Actions project properties
    formEditProject,
    onSubmitEditProject,

    // Members
    currentMembers,
    pendingMembers,
    // Actions members
    handleRemoveMember,
    handleAcceptPendingMember,
    handleRejectPendingMember,

    deleteProject,

    formCreateNotebook,
    onSubmitCreateNotebook,
  } = useProject({
    _project,
  });

  return (
    <section className="space-y-4 p-4 md:p-6">
      <div className="w-full flex items-center md:justify-between flex-col md:flex-row gap-4">
        <div className="flex gap-2 items-center w-full justify-start">
          <HoverCard openDelay={10} closeDelay={100}>
            <HoverCardTrigger>
              <Typography variant="h1" className="text-2xl!">
                {projectName}
              </Typography>
            </HoverCardTrigger>
            {projectDescription && (
              <HoverCardContent side="bottom" align="start">
                <Typography
                  variant="p"
                  className="text-sm leading-relaxed text-muted-foreground mt-0! text-pretty"
                >
                  {projectDescription}
                </Typography>
              </HoverCardContent>
            )}
          </HoverCard>
          <AvatarGroup members={currentMembers} />
        </div>

        <div className="flex gap-2 w-full justify-end">
          <DialogManageProject
            form={formEditProject}
            onSubmit={onSubmitEditProject}
          />
          <DialogManageUsers
            joinCode={project.join_code}
            isProjectOwner={project.owner_id === userId}
            projectOwnerId={project.owner_id}
            currentMembers={currentMembers}
            pendingMembers={pendingMembers}
            onRemoveMember={handleRemoveMember}
            onAccept={handleAcceptPendingMember}
            onReject={handleRejectPendingMember}
          />
          <DialogDeleteProject
            projectName={project.name}
            deleteProject={deleteProject}
          />
        </div>
      </div>
      {notebooks?.length === 0 && (
        <section className="w-full flex items-center justify-center min-h-[calc(100vh-200px)]">
          <EmptyState
            icon={FilePlusCorner}
            title="Sin notebooks aún"
            description="No has creado ningún notebook dentro de tu proyecto. Comienza creando tu primer notebook."
            action={
              <DialogCreateNotebook
                form={formCreateNotebook}
                onSubmit={onSubmitCreateNotebook}
              />
            }
          />
        </section>
      )}
      {notebooks?.length > 0 && (
        <div className="w-full grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {notebooks.map((notebook) => (
            <CardNotebook
              key={notebook.id}
              projectId={project.id}
              notebookId={notebook.id}
              name={notebook.name}
              description={notebook.description}
            />
          ))}
          <DialogCreateNotebook
            form={formCreateNotebook}
            onSubmit={onSubmitCreateNotebook}
          />
        </div>
      )}
      {/* <pre>{JSON.stringify(_project, null, 2)}</pre> */}
    </section>
  );
};
