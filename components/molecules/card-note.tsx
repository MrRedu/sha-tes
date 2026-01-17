'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { Note } from '@/types/types';
import { Pencil, Trash2, Check } from 'lucide-react';

interface CardNoteProps {
  note: Note;
  onToggleComplete: (note: Note) => void;
  onEdit: (note: Note) => void;
  onDelete: (noteId: string) => void;
}

const PRIORITY_BADGES = {
  low: { label: '🟢 Baja', class: 'bg-green-100 text-green-800' },
  normal: { label: '⚪ Normal', class: 'bg-gray-100 text-gray-800' },
  high: { label: '🟡 Alta', class: 'bg-yellow-100 text-yellow-800' },
  urgent: { label: '🔴 Urgente', class: 'bg-red-100 text-red-800' },
};

export const CardNote = ({
  note,
  onToggleComplete,
  onEdit,
  onDelete,
}: CardNoteProps) => {
  const priorityBadge =
    PRIORITY_BADGES[note.priority as keyof typeof PRIORITY_BADGES] ||
    PRIORITY_BADGES.normal;

  return (
    <Card
      className={`h-full transition-all ${note.is_completed ? 'opacity-60' : ''}`}
      style={{ backgroundColor: note.color }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            {note.title && (
              <Typography variant="large" className="font-semibold mb-1">
                {note.title}
              </Typography>
            )}
            <span
              className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${priorityBadge.class}`}
            >
              {priorityBadge.label}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onToggleComplete(note)}
          >
            <Check
              className={`h-4 w-4 ${note.is_completed ? 'text-green-600' : 'text-gray-400'}`}
            />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Typography
          variant="p"
          className={`whitespace-pre-wrap ${note.is_completed ? 'line-through' : ''}`}
        >
          {note.content}
        </Typography>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onEdit(note)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive"
          onClick={() => onDelete(note.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
