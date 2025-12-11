import { ClockIcon } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card, CardFooter, CardHeader } from '../ui/card';
import { Typography } from '../ui/typography';
import type { RpcPendingProject } from '@/types/types';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface CardPendingProjectProps {
  name: RpcPendingProject['project_name'];
  ownerName: RpcPendingProject['owner_full_name'];
}

export const CardPendingProject = ({
  name,
  ownerName,
}: CardPendingProjectProps) => {
  return (
    <Card className="opacity-50">
      <CardHeader className="flex items-center justify-between">
        <Typography variant="large">{name}</Typography>
        <Badge variant="secondary">
          <ClockIcon />
          Pending
        </Badge>
      </CardHeader>
      <CardFooter className="mt-auto">
        <Avatar>
          <AvatarImage src={undefined} alt={undefined} />
          <AvatarFallback>
            {ownerName?.slice(0, 2).toUpperCase() || ''}
          </AvatarFallback>
        </Avatar>
      </CardFooter>
    </Card>
  );
};
