'use client';
import {
  Form,
  FormControl,
  FormDescription,
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
import { PlusIcon } from 'lucide-react';
import { useProjectStore } from '@/hooks/use-project-store';
import { useCreateProject } from '@/hooks/use-create-project';

interface ProjectsParams {
  triggerComponent?: React.ReactNode;
}

const DEFAULT_TRIGGER_COMPONENT = (
  <Button size="lg">
    <PlusIcon className="mr-2 " />
    Crear proyecto
  </Button>
);

export function DialogCreateProject({
  triggerComponent = DEFAULT_TRIGGER_COMPONENT,
}: ProjectsParams) {
  const { isCreateDialogOpen, setCreateDialogOpen } = useProjectStore();
  const { form, onSubmit, isLoading } = useCreateProject();

  return (
    <Dialog open={isCreateDialogOpen} onOpenChange={setCreateDialogOpen}>
      <DialogTrigger asChild>{triggerComponent}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle>Crear proyecto</DialogTitle>
              <DialogDescription>{`¡Crea tu proyecto; rápido y sencillo!`}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="ShaTes" {...field} />
                    </FormControl>
                    <FormDescription>
                      Este será visible para ti y para los colaboradores que invites.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" type="button">Cancelar</Button>
              </DialogClose>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Creando...' : 'Crear proyecto'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
