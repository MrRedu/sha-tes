'use client';

import { AvatarGroup } from '@/components/molecules/avatar-group';
import { DialogManageUsers } from '@/components/molecules/dialog-manage-users';
import { Typography } from '@/components/ui/typography';
import { useProject } from '@/hooks/use-projects';
import { DialogDeleteProject } from '../molecules/dialog-delete-project';

export interface ProjectProps {
  userId: string;
  project: {
    id: string;
    name: string;
    owner_id: string;
    join_code: string;
    members: string[];
    pending_requests: string[];
  };
  members:
    | {
        id: string;
        email: string;
        full_name: string;
        avatar_url: string | null;
      }[]
    | null;
  pendingMembers:
    | {
        id: string;
        email: string;
        full_name: string;
        avatar_url: string | null;
      }[]
    | null;
}

export const Project = ({
  userId,
  project,
  members,
  pendingMembers,
}: ProjectProps) => {
  const {
    _members,
    _pendingMembers,
    deleteProject,
    handleRemoveMember,
    handleAcceptPendingMember,
    handleRejectPendingMember,
  } = useProject({
    projectId: project.id,
    members,
    pendingMembers,
  });

  return (
    <>
      <div className="w-full flex items-center justify-between mb-4 flex-col md:flex-row gap-4">
        <div className="flex gap-2">
          <Typography variant="h3">{project.name}</Typography>
          <AvatarGroup members={_members} />
        </div>
        <div className="flex gap-2">
          <DialogManageUsers
            isProjectOwner={project.owner_id === userId}
            projectOwnerId={project.owner_id}
            joinCode={project.join_code}
            currentMembers={_members}
            pendingMembers={_pendingMembers}
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

      <pre>{JSON.stringify(project, null, 2)}</pre>
    </>
  );
};
