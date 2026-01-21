import type { Members } from '@/types/types';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface AvatarGroupProps {
  members: Members;
  maxMembers?: number;
}

export const AvatarGroup = ({ members, maxMembers = 3 }: AvatarGroupProps) => {
  if (members?.length > 1) {
    const displayedMembers = members.slice(0, maxMembers);
    const remainingCount = members.length - maxMembers;

    return (
      <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2">
        {displayedMembers.map(({ profile }) => (
          <Avatar key={profile.full_name}>
            <AvatarImage
              src={profile.avatar_url || ''}
              alt={profile.full_name}
              title={profile.full_name}
            />
            <AvatarFallback title={profile.full_name}>
              {profile.full_name.slice(0, 2).toUpperCase() || 'N'}
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
      <AvatarImage
        src={UNIQUE_MEMBER?.profile?.avatar_url || ''}
        alt={UNIQUE_MEMBER?.profile?.full_name}
      />
      <AvatarFallback>
        {UNIQUE_MEMBER?.profile?.full_name?.slice(0, 2).toUpperCase() || ''}
      </AvatarFallback>
    </Avatar>
  );
};
