import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { AvatarGroup } from './avatar-group';
import type { Project, User } from '@/hooks/types/types';

interface CardProjectProps {
  project: Project;
  projectMembers: User[];
}

export const CardProject = ({
  project,
  projectMembers = [],
}: CardProjectProps) => {
  return (
    <Link href={`/dashboard/projects/${project.id}`}>
      <Card>
        <CardHeader>
          <h3>{project.name}</h3>
        </CardHeader>
        <CardContent>
          <code>ID: {project.id}</code> <br />
          <code>Join: {project.join_code}</code>
        </CardContent>
        <CardFooter>
          <AvatarGroup members={projectMembers} />
        </CardFooter>
      </Card>
    </Link>
  );
};
