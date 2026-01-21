import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
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
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { FilePlusCorner } from 'lucide-react';
import { Typography } from '../ui/typography';
import {
  useDisclosure,
  type UseDisclosureHandlers,
} from '@/hooks/use-disclosure';

const TriggerUI = ({
  handleOpen,
}: {
  handleOpen: UseDisclosureHandlers['open'];
}) => {
  return (
    <Card
      className="cursor-pointer opacity-50 border-dashed border-2 hover:opacity-100 transition-opacity duration-300 ease-in-out gap-0 h-full"
      onClick={handleOpen}
    >
      <CardHeader className="text-center">
        <Typography variant="large">Crear Notebook</Typography>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <FilePlusCorner size={32} />
      </CardContent>
      {/* <CardFooter className="flex items-center justify-center text-center">
        <Typography variant="muted">Crea un nuevo notebook</Typography>
      </CardFooter> */}
    </Card>
  );
};

interface DialogCreateNotebookProps {
  // TODO: fix types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: () => void;
}

export const DialogCreateNotebook = ({
  form,
  onSubmit,
}: DialogCreateNotebookProps) => {
  const [isOpen, { open, close, toggle }] = useDisclosure();

  const handleCreate = () => {
    close();
    onSubmit();
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <Form {...form}>
        <form onSubmit={onSubmit} className="w-full max-w-xs">
          <DialogTrigger asChild>
            <TriggerUI handleOpen={open} />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Crear bloc de notas</DialogTitle>
              <DialogDescription>
                {`¡Crea tu bloc de notas; rápido y sencillo!`}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="🛒 Hogar" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Lista de compras para el hogar"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button type="submit" onClick={handleCreate}>
                Crear bloc de notas
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
};
