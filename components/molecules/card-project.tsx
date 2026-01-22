import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '../ui/card';
import { AvatarGroup } from './avatar-group';
import type { Members, Project } from '@/types/types';
import { Typography } from '../ui/typography';

interface CardProjectProps {
  id: Project['id'];
  name: Project['name'];
  description: Project['description'];
  members: Members;
}

export const CardProject = ({ id, name, description, members }: CardProjectProps) => {
  return (
    <Link
      href={`/dashboard/projects/${id}`}
      className="block h-full transition-transform hover:scale-105"
    >
      <Card className="h-full gap-0 cursor-pointer hover:shadow-lg transition-shadow">
        <CardHeader>
          <Typography variant="large">{name}</Typography>
        </CardHeader>
        {description && (
          <CardContent className="mb-2">
            <CardDescription className="line-clamp-2">{description}</CardDescription>
          </CardContent>
        )}
        <CardFooter className="mt-auto">
          <AvatarGroup members={members} />
        </CardFooter>
      </Card>
    </Link>
  );
};
