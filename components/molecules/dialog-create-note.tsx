'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { createNoteSchema } from '@/hooks/validations/note';
import { Card, CardHeader } from '../ui/card';
import { Typography } from '../ui/typography';

import { useNoteMutations } from '@/hooks/use-notebooks';

interface DialogCreateNoteProps {
  notebookId: string;
}

const NOTE_COLORS = [
  { value: '#ffffff', label: 'Blanco', class: 'bg-white' },
  { value: '#fef3c7', label: 'Amarillo', class: 'bg-yellow-100' },
  { value: '#dbeafe', label: 'Azul', class: 'bg-blue-100' },
  { value: '#dcfce7', label: 'Verde', class: 'bg-green-100' },
  { value: '#fce7f3', label: 'Rosa', class: 'bg-pink-100' },
  { value: '#f3e8ff', label: 'Morado', class: 'bg-purple-100' },
  { value: '#fed7aa', label: 'Naranja', class: 'bg-orange-100' },
  { value: '#fecaca', label: 'Rojo', class: 'bg-red-100' },
];

export const DialogCreateNote = ({ notebookId }: DialogCreateNoteProps) => {
  const { formCreateNote: form, onSubmitCreateNote: onSubmit } = useNoteMutations(notebookId);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nueva nota
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Crear nueva nota</DialogTitle>
          <DialogDescription>
            Agrega una nueva nota a este notebook con todos los detalles.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Título de la nota..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Content */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contenido *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Escribe el contenido de tu nota..."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Color Picker */}
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <div className="flex gap-2 flex-wrap">
                    {NOTE_COLORS.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => field.onChange(color.value)}
                        className={`w-10 h-10 rounded-md border-2 transition-all ${color.class} ${
                          field.value === color.value
                            ? 'border-primary scale-110'
                            : 'border-gray-300 hover:scale-105'
                        }`}
                        title={color.label}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Priority */}
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prioridad</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona la prioridad" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">🟢 Baja</SelectItem>
                      <SelectItem value="normal">⚪ Normal</SelectItem>
                      <SelectItem value="high">🟡 Alta</SelectItem>
                      <SelectItem value="urgent">🔴 Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Is Completed */}
            <FormField
              control={form.control}
              name="is_completed"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Marcar como completada</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Crear nota</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
