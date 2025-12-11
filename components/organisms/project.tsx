'use client';

import { AvatarGroup } from '@/components/molecules/avatar-group';
import { DialogManageUsers } from '@/components/molecules/dialog-manage-users';
import { Typography } from '@/components/ui/typography';
import { useProject } from '@/hooks/use-projects';
import { DialogDeleteProject } from '../molecules/dialog-delete-project';
import type { ProjectWithMembers, User } from '@/types/types';
import { DialogCreateNotebook } from '../molecules/dialog-create-notebook';
import { FilePenLine } from 'lucide-react';
import { Button } from '../ui/button';
import { DialogManageProject } from '../molecules/dialog-manage-project';

export interface ProjectProps {
  userId: User['id'];
  project: ProjectWithMembers;
}

export const Project = ({ userId, project }: ProjectProps) => {
  const {
    // members,
    currentMembers,
    pendingMembers,

    formEditProject,
    onSubmitEditProject,
    projectName,
    projectDescription,

    deleteProject,
    handleRemoveMember,
    handleAcceptPendingMember,
    handleRejectPendingMember,
  } = useProject({
    project,
    _members: project.members,
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
      <div className="w-full grid  sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <DialogCreateNotebook />
      </div>

      <pre>{JSON.stringify(project, null, 2)}</pre>
    </>
  );
};
