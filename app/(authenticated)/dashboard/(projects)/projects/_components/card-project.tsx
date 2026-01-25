import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { es } from 'date-fns/locale';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { AvatarGroup } from '@/components/molecules/avatar-group';
import { Typography } from '@/components/ui/typography';
import Link from 'next/link';
import { ProjectWithMembers } from '@/types/types';

interface CardProjectProps {
  id: ProjectWithMembers['id'];
  priority: ProjectWithMembers['priority'];
  updated_at: ProjectWithMembers['updated_at'];
  title: ProjectWithMembers['title'];
  description: ProjectWithMembers['description'];
  members: ProjectWithMembers['members'];
  className?: string;
}

export const CardProject = ({
  id,
  priority,
  updated_at,
  className,
  title,
  description,
  members,
}: CardProjectProps) => {
  const PROGRESS_VALUE = 83;

  const PRIORITY_TEXT = {
    low: 'Baja',
    medium: 'Media',
    high: 'Alta',
  };

  const COLOR_BADGE = {
    low: 'outline',
    medium: 'secondary',
    high: 'default',
  } as const;

  return (
    <Link href={`/dashboard/projects/${id}`} className={cn('w-full gap-0 @container', className)}>
      <Card className="h-full min-h-[250px]">
        <CardHeader className="items-center flex">
          <Badge variant={COLOR_BADGE[priority]} className="uppercase">
            Prioridad {PRIORITY_TEXT[priority]}
          </Badge>
          {`·`}
          <Typography variant="small" className={cn('mt-0')}>
            Actualizado{' '}
            {formatDistanceToNow(new Date(updated_at), {
              addSuffix: true,
              locale: es,
            })}
          </Typography>
        </CardHeader>
        <CardContent className="mb-4">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 break-words">{description}</p>
        </CardContent>
        <CardFooter className="mt-auto flex items-start flex-col gap-2">
          <div className="flex items-center justify-between gap-2 w-full">
            <div className="flex items-center gap-2">
              18 blocs de notas
              <AvatarGroup members={members} maxMembers={2} className="@md:flex hidden" />
            </div>
            <span>{PROGRESS_VALUE}% completado</span>
          </div>
          <Progress value={PROGRESS_VALUE} />
        </CardFooter>
      </Card>
    </Link>
  );
};
