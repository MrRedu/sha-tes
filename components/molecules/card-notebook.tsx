import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { Notebook } from '@/types/types';
import Link from 'next/link';

interface CardNotebookProps {
  projectId: string;
  notebookId: Notebook['id'];
  name: Notebook['name'];
  description: Notebook['description'];
}

export const CardNotebook = ({ projectId, notebookId, name, description }: CardNotebookProps) => {
  return (
    <Link
      href={`/dashboard/projects/${projectId}/notebooks/${notebookId}`}
      className="block h-full transition-transform hover:scale-105"
      // title={name}
    >
      <Card className="h-full gap-0 cursor-pointer hover:shadow-lg transition-shadow">
        <CardHeader className="pb-0">
          <Typography variant="large" className="line-clamp-2">
            {name}
          </Typography>
        </CardHeader>
        {description && (
          <CardContent>
            <CardDescription className="line-clamp-2">{description}</CardDescription>
          </CardContent>
        )}
      </Card>
    </Link>
  );
};
