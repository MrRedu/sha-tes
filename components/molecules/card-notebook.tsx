import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { Notebook } from '@/types/types';

interface CardNotebookProps {
  name: Notebook['name'];
  description: Notebook['description'];
}

export const CardNotebook = ({ name, description }: CardNotebookProps) => {
  return (
    // <Link href={`/dashboard/projects/${id}`}>
    <Card className="h-full">
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
      {/* <CardFooter className="mt-auto">
        Footer
      </CardFooter> */}
    </Card>
    // </Link>
  );
};
