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
import { Card, CardContent, CardHeader } from '../ui/card';
import { PlusIcon } from 'lucide-react';
import { useDisclosure } from '@/hooks/use-disclosure';
import { cn } from '@/lib/utils';

import { useNotebookMutations } from '@/hooks/use-projects';

const DEFAULT_TRIGGER_COMPONENT = (
  // <Card
  //   className={cn(
  //     'h-full min-h-[250px] cursor-pointer border-dashed border-spacing-8 border-2 transition-all duration-300 text-center justify-center flex-col-reverse bg-transparent capitalize! opacity-50 hover:opacity-100'
  //   )}
  // >
  //   <CardHeader>
  //     <h3>Crear nuevo notebook</h3>
  //   </CardHeader>
  //   <CardContent>
  //     <Button className="rounded-full" variant="secondary" size="icon-lg">
  //       <PlusIcon className="size-6" />
  //     </Button>
  //   </CardContent>
  // </Card>
  <Button size="lg">
    <PlusIcon className="mr-2 " />
    Crear bloc de notas
  </Button>
);

interface DialogCreateNotebookProps {
  projectId: string;
  triggerComponent?: React.ReactNode;
}

export const DialogCreateNotebook = ({
  projectId,
  triggerComponent = DEFAULT_TRIGGER_COMPONENT,
}: DialogCreateNotebookProps) => {
  const [isOpen, { toggle, close }] = useDisclosure();
  const { form, onSubmit, isCreating } = useNotebookMutations(projectId);

  const handleOnSubmit = async (e: React.FormEvent) => {
    await onSubmit(e);
    close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogTrigger asChild>{triggerComponent}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={handleOnSubmit} className="w-full">
            <DialogHeader>
              <DialogTitle>Crear bloc de notas</DialogTitle>
              <DialogDescription>{`¡Crea tu bloc de notas; rápido y sencillo!`}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
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
                      <Input placeholder="Lista de compras para el hogar" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isCreating}>
                {isCreating ? 'Creando...' : 'Crear bloc de notas'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
