import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { FolderIcon } from 'lucide-react';
import { es } from 'date-fns/locale';
import type { Member, Project } from '@/types/types';
import { AvatarGroup } from '@/components/molecules/avatar-group';
import { STATUS_LABELS } from '@/lib/constants';
import Link from 'next/link';
import { Typography } from '@/components/ui/typography';

interface CardCurrentProjectProps {
  id: Project['id'];
  title: Project['title'];
  description: Project['description'];
  status: Project['status'];
  members: Member[];
  updatedAt: Project['updated_at'];
}

export const CardCurrentProject = ({
  id,
  status,
  title,
  description,
  updatedAt,
  members,
}: CardCurrentProjectProps) => {
  return (
    <Link href={`/dashboard/projects/${id}`}>
      <Card className="h-full">
        <CardHeader className="flex items-start justify-between">
          <div className="grid place-items-center w-10 h-10 rounded-lg bg-primary/10">
            <FolderIcon className="w-5 h-5 text-primary" />
          </div>
          <Badge>{STATUS_LABELS[status]}</Badge>
        </CardHeader>
        <CardContent>
          <Typography variant="large" className="line-clamp-2">
            {title}
          </Typography>
          <Typography variant="small" className="line-clamp-2">
            {description}
          </Typography>
        </CardContent>
        <CardFooter className="flex items-center justify-between mt-auto">
          <AvatarGroup members={members} />
          <Typography variant="small" className="text-muted-foreground">
            {formatDistanceToNow(new Date(updatedAt), {
              addSuffix: true,
              locale: es,
            })}
          </Typography>
        </CardFooter>
      </Card>
    </Link>
  );
};
