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
import { Button } from '../ui/button';
import { UserMinus, UserPlus, Users, UserX } from 'lucide-react';
import { formatCode } from '@/lib/utils';
import { Typography } from '../ui/typography';
import { type User } from '@/app/(authenticated)/dashboard/(projects)/projects/[projectId]/page';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface DialogManageUsersProps {
  isProjectOwner: boolean;
  projectOwnerId: string;
  joinCode: string;
  currentMembers: User[];
  pendingMembers: User[];
  onRemoveMember: (userId: string) => void;
  onAccept: (userId: string) => void;
  onReject: (userId: string) => void;
}

type CurrentMembersListProps = {
  currentMembers: User[];
  isProjectOwner: boolean;
  projectOwnerId: string;
};
type PendingMembersListProps = {
  pendingMembers: User[];
};

const CurrentMembersList = ({
  currentMembers,
  isProjectOwner,
  projectOwnerId,
  onRemoveMember,
}: CurrentMembersListProps & { onRemoveMember: (userId: string) => void }) => {
  return (
    <ul className="space-y-2">
      {currentMembers.map((member, index) => (
        <li key={index} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src={member.avatar_url || ''}
                alt={member.full_name}
              />
              <AvatarFallback>{member.full_name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <Typography variant="small">{member.full_name}</Typography>
                {member.id === projectOwnerId && (
                  <Typography variant="xsmall">(Propietario)</Typography>
                )}
              </div>
              <Typography variant="muted">{member.email}</Typography>
            </div>
          </div>
          {isProjectOwner && member.id !== projectOwnerId && (
            <div className="space-x-1">
              <Button
                variant="secondary"
                size="icon"
                className="hover:bg-red-400/50"
                aria-label="Remove user"
                onClick={() => onRemoveMember(member.id)}
              >
                <UserX />
              </Button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

const PendingMembersList = ({
  pendingMembers,
  onAccept,
  onReject,
}: PendingMembersListProps & {
  onAccept: (userId: string) => void;
  onReject: (userId: string) => void;
}) => {
  return (
    <ul className="space-y-2">
      {pendingMembers.map((member, index) => (
        <li key={index} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src={member.avatar_url || ''}
                alt={member.full_name}
              />
              <AvatarFallback>{member.full_name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <Typography variant="small">{member.full_name}</Typography>
              <Typography variant="muted">{member.email}</Typography>
            </div>
          </div>
          <div className="space-x-1">
            <Button
              variant="secondary"
              size="icon"
              className="hover:bg-red-400/50"
              aria-label="Reject request"
              onClick={() => onReject(member.id)}
            >
              <UserMinus />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="bg-green-100 hover:bg-green-400/50"
              aria-label="Accept request"
              onClick={() => onAccept(member.id)}
            >
              <UserPlus />
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export const DialogManageUsers = ({
  isProjectOwner,
  projectOwnerId,
  joinCode,
  currentMembers,
  pendingMembers,
  onRemoveMember,
  onAccept,
  onReject,
}: DialogManageUsersProps & { projectId?: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Users />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Gestionar usuarios</DialogTitle>
          <DialogDescription>
            Aquí puedes gestionar los usuarios para este proyecto.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Typography variant="lead" className="mb-2">
            Código de invitación
          </Typography>
          <Typography variant="code">{formatCode(joinCode)}</Typography>
          <Typography variant="lead" className="mt-4 mb-2">
            {isProjectOwner ? 'Miembros actuales' : 'Miembros'}
          </Typography>
          {currentMembers.length > 0 ? (
            <CurrentMembersList
              currentMembers={currentMembers}
              isProjectOwner={isProjectOwner}
              projectOwnerId={projectOwnerId}
              onRemoveMember={onRemoveMember}
            />
          ) : (
            <div>No hay miembros en este proyecto.</div>
          )}

          {isProjectOwner && (
            <>
              <Typography variant="lead" className="mt-4 mb-2">
                Miembros pendientes
              </Typography>
              {pendingMembers && pendingMembers.length > 0 ? (
                <PendingMembersList
                  pendingMembers={pendingMembers}
                  onAccept={onAccept}
                  onReject={onReject}
                />
              ) : (
                <div>No hay miembros pendientes.</div>
              )}
            </>
          )}
        </div>
        <DialogFooter>
          <DialogClose>Cerrar</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
