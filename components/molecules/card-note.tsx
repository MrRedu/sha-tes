'use client';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { Note } from '@/types/types';
import { Badge } from '../ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface CardNoteProps {
  note: Note;
}

const PRIORITY_BADGES = {
  low: { label: 'Baja', class: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
  normal: { label: 'Normal', class: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
  high: { label: 'Alta', class: 'bg-amber-500/10 text-amber-600 border-amber-500/20' },
  urgent: { label: 'Urgente', class: 'bg-rose-500/10 text-rose-600 border-rose-500/20' },
};

export const CardNote = ({ note }: CardNoteProps) => {
  const priorityBadge =
    PRIORITY_BADGES[note.priority as keyof typeof PRIORITY_BADGES] || PRIORITY_BADGES.normal;

  return (
    <Card className="h-full w-full md:flex-row p-4">
      <CardHeader className="flex md:flex-col md:max-w-[180px] items-center md:items-start justify-between w-full">
        <Badge variant="outline" className={`${priorityBadge.class}`}>
          {priorityBadge.label}
        </Badge>
        <Typography variant="muted">
          {formatDistanceToNow(new Date(note.updated_at), {
            locale: es,
            addSuffix: true,
          })}
        </Typography>
      </CardHeader>
      <CardContent className="w-full">
        <Typography variant="h4" className="line-clamp-1 mb-0!">
          {note.title}
        </Typography>
        {note.content && (
          <Typography className="mt-0! line-clamp-3 md:line-clamp-1">{note.content}</Typography>
        )}
      </CardContent>
      <CardFooter className="w-full flex gap-2 items-center md:justify-end md:max-w-[180px]">
        <Badge variant="outline" className={`${priorityBadge.class}`}>
          {priorityBadge.label}
        </Badge>
        <div>div</div>
      </CardFooter>
    </Card>
  );
};
