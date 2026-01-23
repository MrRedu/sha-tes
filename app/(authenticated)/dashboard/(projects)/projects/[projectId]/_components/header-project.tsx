'use client';

import { AvatarGroup } from '@/components/molecules/avatar-group';
import { DialogManageUsers } from '@/components/molecules/dialog-manage-users';
import { Typography } from '@/components/ui/typography';
import {
  useProjectDetails,
} from '@/hooks/use-projects';
import { DialogDeleteProject } from '@/components/molecules/dialog-delete-project';
import type { User, Member, Project } from '@/types/types';
import { DialogManageProject } from '@/components/molecules/dialog-manage-project';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';
import { PRIORITY_LABELS } from '@/lib/constants';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface HeaderProjectProps {
  projectId: Project['id'];
  userId: User['id'];
}

export const HeaderProject = ({ projectId, userId }: HeaderProjectProps) => {
  const { data: project, isLoading } = useProjectDetails(projectId);

  if (isLoading || !project) {
    return (
      <div className="w-full flex items-center justify-between h-12">
        <div className="flex items-center gap-4">
          <div className="h-8 w-48 bg-muted animate-pulse rounded" />
        </div>
      </div>
    );
  }

  const currentMembers = project.members.filter((m: Member) => m.status === 'member');

  return (
    <div className="w-full flex items-center md:justify-between flex-col md:flex-row gap-4">
      <div className="flex flex-col gap-2 w-full">
        <HoverCard openDelay={10} closeDelay={100}>
          <HoverCardTrigger>
            <Typography variant="h1" className="text-2xl! text-start">
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
        <div className="flex gap-2 items-center">
          <Badge className='px-4'>
            {PRIORITY_LABELS[project.priority]}
          </Badge>
          <Typography variant="muted">
            Última actividad:{' '}
            {formatDistanceToNow(new Date(project.updated_at), {
              locale: es,
              addSuffix: true,
            })}
          </Typography>
        </div>
      </div>

      <div className="flex flex-row-reverse md:flex-row gap-2 w-full items-center mt-auto justify-end">
        <AvatarGroup members={currentMembers} className='pr-8' />
        <div className='flex gap-2'>
        <DialogManageProject projectId={projectId} />
        <DialogManageUsers
          projectId={projectId}
          userId={userId}
          />
        <DialogDeleteProject 
          projectId={projectId}
          projectTitle={project.title} 
          />
          </div>
      </div>
    </div>
  );
};
