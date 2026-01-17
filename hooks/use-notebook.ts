'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createNoteSchema, updateNoteSchema } from './validations/note';
import type { NotebookWithNotes, Note } from '@/types/types';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface UseNotebookProps {
  _notebook: NotebookWithNotes;
  userId: string;
}

export const useNotebook = ({ _notebook, userId }: UseNotebookProps) => {
  const router = useRouter();
  const [notebook] = useState<NotebookWithNotes>(_notebook);
  const [notes, setNotes] = useState(_notebook.notes || []);

  // Form for creating notes
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

  // Form for updating notes
  const formUpdateNote = useForm<z.infer<typeof updateNoteSchema>>({
    resolver: zodResolver(updateNoteSchema),
  });

  // Create note handler
  const onSubmitCreateNote = async (
    values: z.infer<typeof createNoteSchema>,
  ) => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('tbl_notes')
      .insert({
        title: values.title || null,
        content: values.content,
        color: values.color,
        priority: values.priority,
        is_completed: values.is_completed,
        notebook_id: notebook.id,
        creator_id: userId,
        last_edited_by: userId,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating note:', error);
      return;
    }

    if (data) {
      setNotes([data, ...notes]);
      formCreateNote.reset();
      router.refresh();
    }
  };

  // Update note handler
  const onSubmitUpdateNote = async (
    noteId: string,
    values: z.infer<typeof updateNoteSchema>,
  ) => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('tbl_notes')
      .update({
        ...values,
        last_edited_by: userId,
      })
      .eq('id', noteId)
      .select()
      .single();

    if (error) {
      console.error('Error updating note:', error);
      return;
    }

    if (data) {
      setNotes(notes.map((note: Note) => (note.id === noteId ? data : note)));
      router.refresh();
    }
  };

  // Toggle completion status
  const toggleNoteCompletion = async (note: Note) => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('tbl_notes')
      .update({
        is_completed: !note.is_completed,
        last_edited_by: userId,
      })
      .eq('id', note.id)
      .select()
      .single();

    if (error) {
      console.error('Error toggling note completion:', error);
      return;
    }

    if (data) {
      setNotes(notes.map((n: Note) => (n.id === note.id ? data : n)));
      router.refresh();
    }
  };

  // Delete note handler
  const deleteNote = async (noteId: string) => {
    const supabase = createClient();

    const { error } = await supabase
      .from('tbl_notes')
      .delete()
      .eq('id', noteId);

    if (error) {
      console.error('Error deleting note:', error);
      return;
    }

    setNotes(notes.filter((note: Note) => note.id !== noteId));
    router.refresh();
  };

  const handleReorderNotes = (newNotes: Note[]) => {
    setNotes(newNotes);
    router.refresh();
  };

  return {
    notebook,
    notes,
    formCreateNote,
    formUpdateNote,
    onSubmitCreateNote,
    onSubmitUpdateNote,
    toggleNoteCompletion,
    deleteNote,
    handleReorderNotes,
  };
};
