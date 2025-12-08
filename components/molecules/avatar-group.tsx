import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

import { type User } from '@/app/(authenticated)/dashboard/(projects)/projects/[projectId]/page';

interface AvatarGroupProps {
  members: User[];
}

export const AvatarGroup = ({ members }: AvatarGroupProps) => {
  if (members.length > 1) {
    return (
      <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2">
        {members.map(({ full_name, avatar_url }) => (
          <Avatar key={full_name}>
            <AvatarImage src={avatar_url || ''} alt={full_name} />
            <AvatarFallback>
              {full_name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>
    );
  }

  return (
    <Avatar>
      <AvatarImage
        src={members[0].avatar_url || ''}
        alt={members[0].full_name}
      />
      <AvatarFallback>
        {members[0].full_name.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};
