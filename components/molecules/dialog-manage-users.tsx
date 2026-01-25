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
import { toast } from 'sonner';
import type { Member } from '@/types/types';
import { WithBadge } from '@/components/atoms/with-badge';
import { useDisclosure } from '@/hooks/use-disclosure';
import { useMemberMutations, useProjectDetails } from '@/hooks/use-projects';
import { WhatsappIcon } from '@/components/ui/svgs/whatsappIcon';
import { shareProjectToWhatsApp } from '@/lib/utils';

interface DialogManageUsersProps {
  projectId: string;
  userId: string;
}

const MemberItem = ({
  member,
  isOwner,
  canManage,
  onAction,
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

  const copyToClipboard = async () => {
    if (!project.join_code) return;
    try {
      await navigator.clipboard.writeText(project.join_code);
      toast.success('Código de proyecto copiado al portapapeles.');
    } catch (err) {
      console.error('Error copying to clipboard:', err);
      toast.error('No se pudo copiar el código de proyecto.');
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
              Invitar a nuevos miembros
            </Typography>
            <div className="flex items-center gap-2 justify-between">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-green-500"
                onClick={() =>
                  shareProjectToWhatsApp({ title: project.title, code: project.join_code || '' })
                }
                title="Compartir por WhatsApp"
              >
                <WhatsappIcon className="size-4" />
              </Button>
              <div className="flex items-center gap-2 bg-muted rounded px-[0.5rem] py-[0.3rem] w-fit">
                <Typography
                  variant="p"
                  className="text-lg tracking-widest font-mono font-semibold bg-transparent p-0"
                >
                  {project.join_code}
                </Typography>
                <div className="flex items-center border-l pl-2 gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-primary"
                    onClick={copyToClipboard}
                    title="Copiar código"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
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
              <Typography
                variant="small"
                className="font-semibold px-1 mb-2 block text-yellow-600 dark:text-yellow-500"
              >
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
                      if (action === 'accept')
                        updateMemberStatus({ userId: member.id, status: 'member' });
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
