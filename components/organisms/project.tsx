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
    <>
      <div className="w-full flex items-center justify-between mb-4 flex-col md:flex-row gap-4">
        <div className="flex gap-2">
          <Typography variant="h3">{projectName}</Typography>
          <AvatarGroup members={currentMembers} />
        </div>
        <div className="flex gap-2">
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
      <div className="w-full grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {notebooks.map((notebook) => (
          <CardNotebook
            key={notebook.id}
            name={notebook.name}
            description={notebook.description}
          />
        ))}
        <DialogCreateNotebook
          form={formCreateNotebook}
          onSubmit={onSubmitCreateNotebook}
        />
      </div>
      <pre>{JSON.stringify(_project, null, 2)}</pre>
    </>
  );
};
