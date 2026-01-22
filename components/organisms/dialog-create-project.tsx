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
import { useDisclosure } from '@/hooks/use-disclosure';
import { type UseFormReturn } from 'react-hook-form';
import { FormCreateProjectType } from '@/hooks/validations/use-projects.schema';

interface ProjectsParams {
  formProjects: UseFormReturn<FormCreateProjectType>;
  onSubmitProjects: () => void;
  triggerComponent?: React.ReactNode;
}

const DEFAULT_TRIGGER_COMPONENT = (
  <Button size="lg">
    <PlusIcon className="mr-2 " />
    Crear proyecto
  </Button>
);

export function DialogCreateProject({
  formProjects,
  onSubmitProjects,
  triggerComponent = DEFAULT_TRIGGER_COMPONENT,
}: ProjectsParams) {
  const [isOpen, { open, close, toggle }] = useDisclosure();

  const handleCreate = () => {
    close();
    onSubmitProjects();
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <Form {...formProjects}>
        <form onSubmit={onSubmitProjects}>
          <DialogTrigger asChild>{triggerComponent}</DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Crear proyecto</DialogTitle>
              <DialogDescription>{`¡Crea tu proyecto; rápido y sencillo!`}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <FormField
                control={formProjects.control}
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
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button type="submit" onClick={handleCreate}>
                Crear proyecto
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
}
