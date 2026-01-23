'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { actions } from '@/actions';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import type { Note, NotebookWithNotes } from '@/types/types';

export function useNotebookDetails(notebookId: string) {
  return useQuery({
    queryKey: ['notebook', notebookId],
    queryFn: async () => {
      const { notebook, error } = await actions.notebooks.fetchNotebookById(notebookId);
      if (error) throw new Error(error);
      return notebook as NotebookWithNotes;
    },
  });
}

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createNoteSchema, updateNoteSchema } from './validations/note';
import { useAuth } from '@/components/auth/AuthProvider';

export function useNoteMutations(notebookId: string) {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const formCreateNote = useForm<z.infer<typeof createNoteSchema>>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      title: '',
      content: '',
      color: '#ffffff',
      priority: 'normal',
      is_completed: false,
    },
  });

  const createNoteMutation = useMutation({
    mutationFn: async (values: z.infer<typeof createNoteSchema>) => {
      const { data, error } = await supabase
        .from('tbl_notes')
        .insert({
          title: values.title || null,
          content: values.content,
          color: values.color,
          priority: values.priority,
          is_completed: values.is_completed,
          notebook_id: notebookId,
          creator_id: user?.id as string,
          last_edited_by: user?.id as string,
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notebook', notebookId] });
      toast.success('Nota creada');
      formCreateNote.reset();
    },
    onError: (err) => {
      console.error('Error creating note:', err);
      toast.error('Error al crear la nota');
    },
  });

  const updateNoteMutation = useMutation({
    mutationFn: async ({
      noteId,
      values,
    }: {
      noteId: string;
      values: z.infer<typeof updateNoteSchema>;
    }) => {
      const { error } = await supabase
        .from('tbl_notes')
        .update({
          ...values,
          last_edited_by: user?.id as string,
        })
        .eq('id', noteId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notebook', notebookId] });
      toast.success('Nota actualizada');
    },
    onError: (err) => {
      console.error('Error updating note:', err);
      toast.error('Error al actualizar la nota');
    },
  });

  const toggleNoteMutation = useMutation({
    mutationFn: async ({ noteId, isCompleted }: { noteId: string; isCompleted: boolean }) => {
      const { error } = await supabase
        .from('tbl_notes')
        .update({ is_completed: isCompleted, last_edited_by: user?.id })
        .eq('id', noteId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notebook', notebookId] });
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: async (noteId: string) => {
      const { error } = await supabase.from('tbl_notes').delete().eq('id', noteId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notebook', notebookId] });
      toast.success('Nota eliminada');
    },
    onError: (err) => {
      console.error('Error deleting note:', err);
      toast.error('Error al eliminar la nota');
    },
  });

  const reorderNotesMutation = useMutation({
    mutationFn: async (notes: Note[]) => {
      const updates = notes.map((note, index) => ({
        id: note.id,
        position: index,
        content: note.content,
        notebook_id: notebookId,
        creator_id: note.creator_id,
      }));

      const { error } = await supabase.from('tbl_notes').upsert(updates);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notebook', notebookId] });
    },
    onError: (err) => {
      console.error('Error reordering notes:', err);
      toast.error('Error al guardar el orden');
    },
  });

  return {
    formCreateNote,
    onSubmitCreateNote: formCreateNote.handleSubmit((values) => createNoteMutation.mutate(values)),
    updateNote: updateNoteMutation.mutate,
    toggleNote: toggleNoteMutation.mutate,
    deleteNote: deleteNoteMutation.mutate,
    reorderNotes: reorderNotesMutation.mutate,
    isCreating: createNoteMutation.isPending,
    isDeleting: deleteNoteMutation.isPending,
  };
}
