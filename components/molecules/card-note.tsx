'use client';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { Note } from '@/types/types';
import { Pencil, Trash2, Check, GripVertical } from 'lucide-react';

interface CardNoteProps {
  note: Note;
  onToggleComplete: (note: Note) => void;
  onEdit: (note: Note) => void;
  onDelete: (noteId: string) => void;
  dragHandleProps?: any;
}

const PRIORITY_BADGES = {
  low: { label: 'Baja', class: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
  normal: { label: 'Normal', class: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
  high: { label: 'Alta', class: 'bg-amber-500/10 text-amber-600 border-amber-500/20' },
  urgent: { label: 'Urgente', class: 'bg-rose-500/10 text-rose-600 border-rose-500/20' },
};

export const CardNote = ({
  note,
  onToggleComplete,
  onEdit,
  onDelete,
  dragHandleProps,
}: CardNoteProps) => {
  const priorityBadge =
    PRIORITY_BADGES[note.priority as keyof typeof PRIORITY_BADGES] || PRIORITY_BADGES.normal;

  return (
    <Card
      className={`h-full transition-all group/card border-border/40 hover:border-border overflow-hidden ${
        note.is_completed ? 'opacity-60 grayscale-[0.2]' : ''
      }`}
      style={{ borderLeft: `4px solid ${note.color || 'transparent'}` }}
    >
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <span
                className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${priorityBadge.class}`}
              >
                {priorityBadge.label}
              </span>
              {dragHandleProps && (
                <div
                  {...dragHandleProps}
                  className="opacity-0 group-hover/card:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
                >
                  <GripVertical className="size-3.5 text-muted-foreground" />
                </div>
              )}
            </div>
            {note.title && (
              <Typography className="font-bold text-sm leading-tight line-clamp-1">
                {note.title}
              </Typography>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded-full hover:bg-primary/10"
            onClick={() => onToggleComplete(note)}
          >
            <Check
              className={`h-4 w-4 ${note.is_completed ? 'text-primary' : 'text-muted-foreground/40'}`}
            />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-1">
        <Typography
          className={`text-sm text-muted-foreground leading-snug line-clamp-3 ${
            note.is_completed ? 'line-through decoration-muted-foreground/30' : ''
          }`}
        >
          {note.content}
        </Typography>
      </CardContent>
      <CardFooter className="flex justify-end gap-1 px-2 pb-2 pt-0 opacity-0 group-hover/card:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 rounded-md"
          onClick={() => onEdit(note)}
        >
          <Pencil className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 rounded-md text-destructive hover:bg-destructive/10"
          onClick={() => onDelete(note.id)}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </CardFooter>
    </Card>
  );
};
