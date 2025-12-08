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

type ProjectsParams = {
  form: any;
  onSubmit: () => void;
};

export function DialogCreateProject({ form, onSubmit }: ProjectsParams) {
  return (
    <Dialog>
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <DialogTrigger asChild>
            <Button size="sm">
              <PlusIcon className="mr-2 " />
              Crear proyecto
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Crear proyecto</DialogTitle>
              <DialogDescription>
                {`¡Crea tu proyecto; rápido y sencillo!`}
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
                      <Input placeholder="ShaTes" {...field} />
                    </FormControl>
                    <FormDescription>
                      Este será visible para ti y para los colaboradores que
                      invites.
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
              <Button type="submit" onClick={onSubmit}>
                Crear proyecto
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
}
