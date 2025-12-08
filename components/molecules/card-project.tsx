import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { AvatarGroup } from './avatar-group';

// TODO
interface CardProjectProps {
  project: any;
  projectMembers: any;
}

export const CardProject = ({ project, projectMembers }: CardProjectProps) => {
  return (
    <Link href={`/dashboard/projects/${project.id}`}>
      <Card>
        <CardHeader>
          <h3>{project.name}</h3>
        </CardHeader>
        <CardContent>
          <code>
            ID: {project.id} | Join: {project.join_code}
          </code>
        </CardContent>
        <CardFooter>
          <AvatarGroup members={projectMembers} />
        </CardFooter>
      </Card>
    </Link>
  );
};
