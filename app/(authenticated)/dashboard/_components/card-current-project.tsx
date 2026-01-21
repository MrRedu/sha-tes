import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { FolderIcon } from 'lucide-react';
import { es } from 'date-fns/locale';
import type { Members } from '@/types/types';
import { AvatarGroup } from '@/components/molecules/avatar-group';

interface CardCurrentProjectProps {
  status: 'active' | 'revision' | 'completed';
  title: string;
  description: string;
  lastUpdate: string;
  members: Members;
}

export const CardCurrentProject = ({
  status = 'active',
  title = 'Proyecto',
  description = 'Descripción del proyecto',
  lastUpdate = 'Hace 2 horas',
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
      <CardFooter className="flex items-center justify-between">
        <AvatarGroup members={members} />
        <p className="text-sm text-muted-foreground">
          {formatDistanceToNow(new Date(lastUpdate), {
            addSuffix: true,
            locale: es,
          })}
        </p>
      </CardFooter>
    </Card>
  );
};
