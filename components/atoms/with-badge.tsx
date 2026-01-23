import { type VariantProps } from 'class-variance-authority';
import { Badge, badgeVariants } from '../ui/badge';

interface WithBadgeProps {
  children: React.ReactNode;
  count: number;
  variant?: VariantProps<typeof badgeVariants>['variant'];
}

export const WithBadge = ({ children, count, variant = 'default' }: WithBadgeProps) => {
  return (
    <div className="relative">
      {children}
      {count > 0 && (
        <Badge
          variant={variant}
          className="absolute -top-2 -right-2 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px]"
        >
          {count}
        </Badge>
      )}
    </div>
  );
};
