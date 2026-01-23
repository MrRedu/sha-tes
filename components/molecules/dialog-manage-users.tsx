'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Copy, UserMinus, UserPlus, Users, UserX, Loader2 } from 'lucide-react';
import { Typography } from '@/components/ui/typography';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Member } from '@/types/types';
import { WithBadge } from '@/components/atoms/with-badge';
import { useDisclosure } from '@/hooks/use-disclosure';
import { useMemberMutations, useProjectDetails } from '@/hooks/use-projects';

interface DialogManageUsersProps {
  projectId: string;
  userId: string;
}

const MemberItem = ({ 
  member, 
  isOwner, 
  canManage, 
  onAction 
}: { 
  member: Member; 
  isOwner: boolean; 
  canManage: boolean;
  onAction?: (action: 'accept' | 'reject' | 'remove') => void;
}) => (
  <li className="flex items-center justify-between py-2">
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src={member.avatar_url || ''} alt={member.full_name} />
        <AvatarFallback>{member.full_name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col text-start">
        <div className="flex items-center gap-1">
          <Typography variant="small" className="font-medium">
            {member.full_name}
          </Typography>
          {isOwner && (
            <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-semibold uppercase tracking-wider">
              Propietario
            </span>
          )}
        </div>
        <Typography variant="muted" className="text-xs">
          {member.email}
        </Typography>
      </div>
    </div>
    
    {canManage && !isOwner && onAction && (
      <div className="flex gap-1">
        {member.status === 'pending' ? (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 hover:bg-red-500/10 hover:text-red-500"
              onClick={() => onAction('reject')}
            >
              <UserMinus className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 hover:bg-green-500/10 hover:text-green-500"
              onClick={() => onAction('accept')}
            >
              <UserPlus className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 hover:bg-red-500/10 hover:text-red-500"
            onClick={() => onAction('remove')}
          >
            <UserX className="h-4 w-4" />
          </Button>
        )}
      </div>
    )}
  </li>
);

export const DialogManageUsers = ({ projectId, userId }: DialogManageUsersProps) => {
  const [isOpen, { open, toggle }] = useDisclosure();
  const { data: project, isLoading } = useProjectDetails(projectId);
  const { updateMemberStatus, removeMember } = useMemberMutations(projectId);

  if (isLoading || !project) {
    return (
      <Button variant="outline" size="icon" disabled>
        <Loader2 className="animate-spin h-4 w-4" />
      </Button>
    );
  }

  const isProjectOwner = project.owner_id === userId;
  const currentMembers = project.members.filter((m: Member) => m.status === 'member');
  const pendingMembers = project.members.filter((m: Member) => m.status === 'pending');

  const copyToClipboard = () => {
    if (project.join_code) {
      navigator.clipboard.writeText(project.join_code);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogTrigger asChild>
        <WithBadge count={pendingMembers.length}>
          <Button variant="outline" size="icon" onClick={open}>
            <Users className="h-4 w-4" />
          </Button>
        </WithBadge>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Gestionar usuarios</DialogTitle>
          <DialogDescription>
            Administra los miembros y las solicitudes de acceso al proyecto.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="p-3 bg-muted/30 rounded-lg border">
            <Typography className="text-muted-foreground block mb-1 font-semibold">
              Código de invitación
            </Typography>
            <div className="flex items-center justify-between">
              <Typography variant="code" className="text-lg tracking-widest bg-transparent p-0">
                {project.join_code}
              </Typography>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={copyToClipboard}>
                <Copy className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          <div>
            <Typography variant="small" className="font-semibold px-1 mb-2 block">
              Miembros ({currentMembers.length})
            </Typography>
            <ul className="divide-y border rounded-lg px-3 bg-card">
              {currentMembers.map((member: Member) => (
                <MemberItem
                  key={member.id}
                  member={member}
                  isOwner={member.id === project.owner_id}
                  canManage={isProjectOwner}
                  onAction={() => removeMember(member.id)}
                />
              ))}
            </ul>
          </div>

          {isProjectOwner && pendingMembers.length > 0 && (
            <div>
              <Typography variant="small" className="font-semibold px-1 mb-2 block text-yellow-600 dark:text-yellow-500">
                Solicitudes pendientes ({pendingMembers.length})
              </Typography>
              <ul className="divide-y border rounded-lg px-3 bg-card border-yellow-200 dark:border-yellow-900/30">
                {pendingMembers.map((member: Member) => (
                  <MemberItem
                    key={member.id}
                    member={member}
                    isOwner={false}
                    canManage={true}
                    onAction={(action) => {
                      if (action === 'accept') updateMemberStatus({ userId: member.id, status: 'member' });
                      if (action === 'reject') removeMember(member.id);
                    }}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cerrar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
