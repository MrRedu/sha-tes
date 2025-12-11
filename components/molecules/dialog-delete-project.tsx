'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { AlertCircle, Trash2Icon } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Alert, AlertTitle } from '../ui/alert';
import { useEffect, useState } from 'react';

interface DialogDeleteProjectProps {
  deleteProject: () => void;
  projectName: string;
}

const formSchema = z.object({
  projectName: z.string(),
  toConfirm: z.string(),
});

export function DialogDeleteProject({
  deleteProject,
  projectName,
}: DialogDeleteProjectProps) {
  const [canDelete, setCanDelete] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: '',
      toConfirm: '',
    },
  });

  const watchedProjectName = form.watch('projectName');
  const watchedToConfirm = form.watch('toConfirm');

  useEffect(() => {
    const isMatch =
      watchedProjectName === projectName &&
      watchedToConfirm === 'eliminar mi proyecto';
    setCanDelete(isMatch);
  }, [watchedProjectName, watchedToConfirm, projectName]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Deleted!', values);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Trash2Icon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Eliminar proyecto</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no puede deshacerse. Esto eliminará permanentemente tu
            proyecto y removerá tus datos de nuestros servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
              <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{`Para confirmar, escribe "${projectName}"`}</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="toConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{`Para confirmar, escribe "eliminar mi proyecto"`}</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <Alert variant="destructive">
            <AlertCircle />
            <AlertTitle>¡Esta acción no se puede deshacer!</AlertTitle>
          </Alert>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-white hover:bg-destructive/90"
            onClick={deleteProject}
            disabled={!canDelete}
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
