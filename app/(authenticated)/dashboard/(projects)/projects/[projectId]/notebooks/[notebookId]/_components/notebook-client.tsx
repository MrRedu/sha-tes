'use client';

import { useState } from 'react';
import { Typography } from '@/components/ui/typography';
import { useNotebookDetails, useNoteMutations } from '@/hooks/use-notebooks';
import { CardNote } from '@/components/molecules/card-note';
import { DialogCreateNote } from '@/components/molecules/dialog-create-note';
import { DialogEditNote } from '@/components/molecules/dialog-edit-note';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Loader2, Plus } from 'lucide-react';
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
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import type { Note } from '@/types/types';
import { notFound } from 'next/navigation';

interface NotebookClientProps {
  projectId: string;
  notebookId: string;
}

export const NotebookClient = ({ projectId, notebookId }: NotebookClientProps) => {
  const { data: notebook, isLoading, error } = useNotebookDetails(notebookId);
  const { toggleNote, deleteNote, reorderNotes } = useNoteMutations(notebookId);

  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [deletingNoteId, setDeletingNoteId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !notebook) return notFound();

  const notes = notebook.notes || [];

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(notes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    reorderNotes(items);
  };

  const handleDeleteNote = () => {
    if (deletingNoteId) {
      deleteNote(deletingNoteId);
      setDeletingNoteId(null);
    }
  };

  return (
    <section className="space-y-4 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href={`/dashboard/projects/${projectId}`}>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <ChevronLeft className="size-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <Typography variant="h1" className="text-2xl font-bold tracking-tight">
                {notebook.name}
              </Typography>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider">
                {notes.length} Notas
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <DialogCreateNote notebookId={notebookId} />
        </div>
      </div>

      {notebook.description && (
        <Typography variant="muted" className="text-sm max-w-3xl border-l-2 pl-4 py-1 italic ml-1">
          {notebook.description}
        </Typography>
      )}

      {/* Notes List */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="notes">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {notes.map((note, index) => (
                <Draggable key={note.id} draggableId={note.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={snapshot.isDragging ? 'z-50 shadow-xl' : ''}
                    >
                      <CardNote
                        dragHandleProps={provided.dragHandleProps}
                        note={note}
                        onToggleComplete={(n) =>
                          toggleNote({ noteId: n.id, isCompleted: !n.is_completed })
                        }
                        onEdit={setEditingNote}
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
        <div className="border border-dashed border-border rounded-xl p-20 flex flex-col items-center justify-center text-center space-y-4 bg-muted/20">
          <Plus className="size-10 text-muted-foreground/40" />
          <div className="space-y-1">
            <Typography variant="h4" className="font-semibold">
              Notebook vacío
            </Typography>
            <Typography variant="muted" className="text-sm">
              Añade tu primera nota para empezar.
            </Typography>
          </div>
        </div>
      )}

      {/* Dialogs */}
      {editingNote && (
        <DialogEditNote
          open={!!editingNote}
          onOpenChange={(open) => !open && setEditingNote(null)}
          note={editingNote}
          notebookId={notebookId}
        />
      )}

      <AlertDialog open={!!deletingNoteId} onOpenChange={(o) => !o && setDeletingNoteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar esta nota?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará permanentemente la nota. No se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteNote}
              className="bg-destructive hover:bg-destructive/90 text-white"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};
