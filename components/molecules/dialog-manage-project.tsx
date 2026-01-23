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

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Button } from '../ui/button';
import { FilePenLine } from 'lucide-react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

import { useProjectStore } from '@/hooks/use-project-store';

import { UseFormReturn } from 'react-hook-form';
import z from 'zod';
import { formEditProjectSchema } from '@/hooks/validations/use-projects.schema';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Constants } from '@/types/database';

const STATUS_LABELS: Record<string, string> = {
  active: 'Activo',
  inactive: 'Inactivo',
  archived: 'Archivado',
  featured: 'Destacado',
};

const PRIORITY_LABELS: Record<string, string> = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
};

const STATUS_OPTIONS = Constants.public.Enums.project_status.map((status) => ({
  value: status,
  label: STATUS_LABELS[status] || status.charAt(0).toUpperCase() + status.slice(1),
}));

const PRIORITY_OPTIONS = Constants.public.Enums.project_priority.map((priority) => ({
  value: priority,
  label: PRIORITY_LABELS[priority] || priority.charAt(0).toUpperCase() + priority.slice(1),
}));

interface DialogManageProjectProps {
  form: UseFormReturn<z.infer<typeof formEditProjectSchema>, any, any>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

export const DialogManageProject = ({ form, onSubmit }: DialogManageProjectProps) => {
  const { isManageDialogOpen, setManageDialogOpen } = useProjectStore();

  return (
    <Dialog open={isManageDialogOpen} onOpenChange={setManageDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <FilePenLine />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Gestionar proyecto</DialogTitle>
          <DialogDescription>
            Aquí puedes gestionar información básica para este proyecto.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-4 ">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{`Título del proyecto`}</FormLabel>
                    <FormControl>
                      <Input placeholder="ShaTes" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Seleccionar estado" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {STATUS_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prioridad</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Seleccionar prioridad" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {PRIORITY_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{`Descripción del proyecto`}</FormLabel>
                    <FormControl>
                      <Textarea
                        className="resize-none"
                        rows={4}
                        placeholder="¡Aplicación para compartir tareas con tus colegas!"
                        onChange={field.onChange}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cerrar</Button>
          </DialogClose>
          <Button onClick={onSubmit}>Guardar cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
