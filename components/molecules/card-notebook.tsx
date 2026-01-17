import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { Notebook } from '@/types/types';
import Link from 'next/link';

interface CardNotebookProps {
  projectId: string;
  notebookId: Notebook['id'];
  name: Notebook['name'];
  description: Notebook['description'];
}

export const CardNotebook = ({
  projectId,
  notebookId,
  name,
  description,
}: CardNotebookProps) => {
  return (
    <Link
      href={`/dashboard/projects/${projectId}/notebooks/${notebookId}`}
      className="block h-full transition-transform hover:scale-105"
    >
      <Card className="h-full cursor-pointer hover:shadow-lg transition-shadow">
        <CardHeader>
          <Typography variant="large">{name}</Typography>
        </CardHeader>
        {description && (
          <CardContent>
            <CardDescription className="line-clamp-2">
              {description}
            </CardDescription>
          </CardContent>
        )}
      </Card>
    </Link>
  );
};
