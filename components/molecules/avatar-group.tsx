import type { Member } from '@/types/types';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '@/lib/utils';

interface AvatarGroupProps {
  members: Member[];
  maxMembers?: number;
  className?: string;
}

export const AvatarGroup = ({ members, maxMembers = 3, className }: AvatarGroupProps) => {
  if (members?.length > 1) {
    const displayedMembers = members.slice(0, maxMembers);
    const remainingCount = members.length - maxMembers;

    return (
      <div
        className={cn(
          '*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2',
          className
        )}
      >
        {displayedMembers.map(({ avatar_url, full_name }) => (
          <Avatar key={full_name}>
            <AvatarImage src={avatar_url || ''} alt={full_name} title={full_name} />
            <AvatarFallback title={full_name}>
              {full_name.slice(0, 2).toUpperCase() || 'N'}
            </AvatarFallback>
          </Avatar>
        ))}
        {remainingCount > 0 && (
          <Avatar>
            <AvatarFallback>+{remainingCount}</AvatarFallback>
          </Avatar>
        )}
      </div>
    );
  }

  const UNIQUE_MEMBER = members?.[0];

  return (
    <Avatar>
      <AvatarImage src={UNIQUE_MEMBER?.avatar_url || ''} alt={UNIQUE_MEMBER?.full_name} />
      <AvatarFallback>{UNIQUE_MEMBER?.full_name?.slice(0, 2).toUpperCase() || ''}</AvatarFallback>
    </Avatar>
  );
};
