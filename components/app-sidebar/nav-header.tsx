import { SidebarGroup, SidebarMenu, SidebarMenuItem, useSidebar } from '../ui/sidebar';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Typography } from '../ui/typography';

// interface NavHeaderProps {}

export const NavHeader = () =>
  // props: NavHeaderProps
  {
    const { open: isSidebarOpen } = useSidebar();
    return (
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem className="flex gap-2 items-center overflow-hidden">
            <Image
              src="/sha-tes.png"
              alt="Logo"
              className={cn(
                'transition-all duration-300 ease-in-out',
                isSidebarOpen ? 'w-8 h-8' : 'w-4 h-4'
              )}
              width={48}
              height={48}
            />
            <div className={cn('', !isSidebarOpen && 'ml-2 duration-600')}>
              <Typography className={cn('text-2xl! mt-0! font-bold')}>ShaTes</Typography>
              <Typography className={cn('text-sm mt-0! text-muted-foreground leading-none')}>
                Free plan
              </Typography>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    );
  };
