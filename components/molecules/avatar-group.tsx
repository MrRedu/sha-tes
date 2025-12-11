import type { Members } from '@/types/types';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface AvatarGroupProps {
  members: Members;
}

export const AvatarGroup = ({ members }: AvatarGroupProps) => {
  if (members?.length > 1) {
    return (
      <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2">
        {members.map(({ profile }) => (
          <Avatar key={profile.full_name}>
            <AvatarImage
              src={profile.avatar_url || ''}
              alt={profile.full_name}
            />
            <AvatarFallback>
              {profile.full_name.slice(0, 2).toUpperCase() || 'N'}
            </AvatarFallback>
          </Avatar>
        ))}
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
