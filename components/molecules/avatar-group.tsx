import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type Member = {
  name: string;
  imageUrl?: string;
};

interface AvatarGroupProps {
  members: Member[];
}

export const AvatarGroup = ({ members }: AvatarGroupProps) => {
  if (members.length > 1) {
    return (
      <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2">
        {members.map(({ name, imageUrl }) => (
          <Avatar key={name}>
            <AvatarImage
              src={
                imageUrl || `https://api.dicebear.com/6.x/initials/svg?seed=US`
              }
              alt={name}
            />
            <AvatarFallback>{}</AvatarFallback>
          </Avatar>
        ))}
      </div>
    );
  }

  return (
    <Avatar>
      <AvatarImage
        src={`https://api.dicebear.com/6.x/initials/svg?seed=US`}
        alt={members[0].name}
      />
      <AvatarFallback>
        {members[0].name.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};
