import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Typography } from '@/components/ui/typography';
import type { Notebook } from '@/types/types';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { Notebook as NotebookIcon } from 'lucide-react';
import Link from 'next/link';

interface CardNotebookProps {
  projectId: string;
  notebookId: Notebook['id'];
  name: Notebook['name'];
  description: Notebook['description'];
  updated_at: Notebook['updated_at'];
  count_notes: number;
}

export const CardNotebook = ({
  projectId,
  notebookId,
  name,
  description,
  updated_at,
  count_notes,
}: CardNotebookProps) => {
  return (
    <Link
      href={`/dashboard/projects/${projectId}/notebooks/${notebookId}`}
      className="cursor-pointer"
    >
      <Card className="h-full">
        <CardHeader className="flex items-start justify-between">
          <div className="grid place-items-center w-10 h-10 rounded-lg bg-primary/10">
            <NotebookIcon className="w-5 h-5 text-primary" />
          </div>
          <Badge variant="secondary">{count_notes || 0} notas</Badge>
        </CardHeader>
        <CardContent>
          <Typography variant="large" className="line-clamp-2">
            {name}
          </Typography>
          {description && <CardDescription className="line-clamp-2">{description}</CardDescription>}
        </CardContent>
        <CardFooter className="mt-auto">
          <Typography variant="small">
            {formatDistanceToNow(new Date(updated_at), {
              locale: es,
              addSuffix: true,
            })}
          </Typography>
        </CardFooter>
      </Card>
    </Link>
  );
};
