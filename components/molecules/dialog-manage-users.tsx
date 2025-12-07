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
import { UserPlus } from 'lucide-react';
import { formatCode } from '@/lib/utils';
import { Typography } from '../ui/typography';

interface DialogManageUsersProps {
  joinCode: string;
  pendingMembers: string[]; // Puedes usar este prop para mostrar solicitudes pendientes
}

export const DialogManageUsers = ({
  joinCode,
  pendingMembers,
}: DialogManageUsersProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <UserPlus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Gestionar nuevos miembros</DialogTitle>
          <DialogDescription>
            Aquí puedes gestionar los usuarios para este proyecto.
          </DialogDescription>
        </DialogHeader>
        <div>
          Código de invitación:{' '}
          <Typography variant="code">{formatCode(joinCode)}</Typography>
          <Typography variant="h4" className="mt-4 mb-2">
            Miembros pendientes:
          </Typography>
          {pendingMembers && pendingMembers.length > 0 ? (
            <div>
              <ul className="list-disc list-inside">
                {pendingMembers.map((member, index) => (
                  <li key={index}>{member}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div>No hay miembros pendientes.</div>
          )}
        </div>
        <DialogFooter>
          <DialogClose>Cerrar</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
