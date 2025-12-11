import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { AvatarGroup } from './avatar-group';
import type { Members, Project } from '@/types/types';

interface CardProjectProps {
  id: Project['id'];
  name: Project['name'];
  description: Project['description'];
  members: Members;
}

export const CardProject = ({
  id,
  name,
  description,
  members,
}: CardProjectProps) => {
  return (
    <Link href={`/dashboard/projects/${id}`}>
      <Card>
        <CardHeader>
          <h3>{name}</h3>
        </CardHeader>
        {description && (
          <CardContent>
            <p>{description}</p>
          </CardContent>
        )}
        <CardFooter>
          <AvatarGroup members={members} />
        </CardFooter>
      </Card>
    </Link>
  );
};
