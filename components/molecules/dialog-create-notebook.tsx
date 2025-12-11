import { FilePlusCorner } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '../ui/dialog';
import { Typography } from '../ui/typography';
import {
  useDisclosure,
  type UseDisclosureHandlers,
} from '@/hooks/use-disclosure';

interface DialogCreateNotebookProps {}

const TriggerUI = ({
  handleOpen,
}: {
  handleOpen: UseDisclosureHandlers['open'];
}) => {
  return (
    <Card className="cursor-pointer opacity-75" onClick={handleOpen}>
      <CardHeader className="text-center">
        <Typography variant="large">Crear Notebook</Typography>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <FilePlusCorner size={48} />
      </CardContent>
      <CardFooter className="flex items-center justify-center text-center">
        <Typography variant="muted">Crea un nuevo notebook</Typography>
      </CardFooter>
    </Card>
  );
};

export const DialogCreateNotebook = (props: DialogCreateNotebookProps) => {
  const [isOpen, { open, close, toggle }] = useDisclosure();

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogTrigger asChild>
        <TriggerUI handleOpen={open} />
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
        </div>
        <DialogFooter>
          <DialogClose>Cerrar</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
