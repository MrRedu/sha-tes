import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { FolderIcon } from 'lucide-react';
import { es } from 'date-fns/locale';
import type { Member } from '@/types/types';
import { AvatarGroup } from '@/components/molecules/avatar-group';

interface CardCurrentProjectProps {
  status: 'active' | 'revision' | 'completed';
  title: string;
  description: string;
  updatedAt: string;
  members: Member[];
}

export const CardCurrentProject = ({
  status = 'active',
  title = 'Proyecto',
  description = 'Descripción del proyecto',
  updatedAt = '2026-01-21T17:03:03-04:00',
  members,
}: CardCurrentProjectProps) => {
  return (
    <Card>
      <CardHeader className="flex items-start justify-between">
        <div className="grid place-items-center w-10 h-10 rounded-lg bg-primary/10">
          <FolderIcon className="w-5 h-5 text-primary" />
        </div>
        <Badge>{status}</Badge>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p>{description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between mt-auto">
        <AvatarGroup members={members} />
        <p className="text-sm text-muted-foreground">
          {formatDistanceToNow(new Date(updatedAt), {
            addSuffix: true,
            locale: es,
          })}
        </p>
      </CardFooter>
    </Card>
  );
};
