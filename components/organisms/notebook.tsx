'use client';

import { useState } from 'react';
import { z } from 'zod';
import { Typography } from '@/components/ui/typography';
import { useNotebook } from '@/hooks/use-notebook';
import { updateNoteSchema } from '@/hooks/validations/note';
import type { NotebookWithNotes, User, Note } from '@/types/types';
import { CardNote } from '../molecules/card-note';
import { DialogCreateNote } from '../molecules/dialog-create-note';
import { DialogEditNote } from '../molecules/dialog-edit-note';
import { Button } from '../ui/button';
import { ArrowLeft, GripVertical } from 'lucide-react';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

export interface NotebookProps {
  userId: User['id'];
  projectId: string;
  _notebook: NotebookWithNotes;
}

export const Notebook = ({ userId, projectId, _notebook }: NotebookProps) => {
  const {
    notebook,
    notes,
    formCreateNote,
    formUpdateNote,
    onSubmitCreateNote,
    onSubmitUpdateNote,
    toggleNoteCompletion,
    deleteNote,
    handleReorderNotes,
  } = useNotebook({
    _notebook,
    userId,
  });

  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [deletingNoteId, setDeletingNoteId] = useState<string | null>(null);

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    formUpdateNote.reset({
      title: note.title || '',
      content: note.content,
      color: note.color,
      priority: note.priority as 'low' | 'normal' | 'high' | 'urgent',
      is_completed: note.is_completed,
    });
  };

  const handleSubmitEdit = async (values: z.infer<typeof updateNoteSchema>) => {
    if (editingNote) {
      await onSubmitUpdateNote(editingNote.id, values);
      setEditingNote(null);
    }
  };

  const handleDeleteNote = async () => {
    if (deletingNoteId) {
      await deleteNote(deletingNoteId);
      setDeletingNoteId(null);
    }
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(notes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Actualización local rápida para feedback instantáneo
    handleReorderNotes(items);

    // Persistencia en Supabase
    const supabase = createClient();
    const updates = items.map((note, index) => ({
      id: note.id,
      position: index,
      content: note.content, // Campos requeridos en tbl_notes
      notebook_id: notebook.id,
      creator_id: note.creator_id,
    }));

    const { error } = await supabase.from('tbl_notes').upsert(updates);

    if (error) {
      console.error('Error saving order:', error);
      toast.error('No se pudo guardar el orden');
      // Revertir si hay error (opcional)
      handleReorderNotes(notes);
    }
  };

  return (
    <>
      <div className="w-full flex items-center justify-between mb-6 flex-col md:flex-row gap-4">
        <div className="flex items-center gap-4">
          <Link href={`/dashboard/projects/${projectId}`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <Typography variant="h3">{notebook.name}</Typography>
            </div>
            {notebook.description && (
              <Typography variant="muted" className="mt-1">
                {notebook.description}
              </Typography>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Typography variant="small" className="text-muted-foreground ml-2">
            Creado por {notebook.creator.full_name}
          </Typography>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="notes" direction="horizontal" type="card">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              <DialogCreateNote
                form={formCreateNote}
                onSubmit={onSubmitCreateNote}
              />

              {notes.map((note: Note, index) => (
                <Draggable key={note.id} draggableId={note.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`relative group ${snapshot.isDragging ? 'z-50' : ''}`}
                    >
                      <div
                        {...provided.dragHandleProps}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-background/50 rounded p-1 cursor-grab active:cursor-grabbing"
                      >
                        <GripVertical className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <CardNote
                        note={note}
                        onToggleComplete={toggleNoteCompletion}
                        onEdit={handleEditNote}
                        onDelete={(id) => setDeletingNoteId(id)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {notes.length === 0 && (
        <div className="text-center py-12">
          <Typography variant="muted">
            No hay notas en este notebook. ¡Crea la primera!
          </Typography>
        </div>
      )}

      {/* Edit Dialog */}
      <DialogEditNote
        open={!!editingNote}
        onOpenChange={(open) => !open && setEditingNote(null)}
        form={formUpdateNote}
        onSubmit={handleSubmitEdit}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deletingNoteId}
        onOpenChange={(open) => !open && setDeletingNoteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. La nota será eliminada
              permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteNote}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
