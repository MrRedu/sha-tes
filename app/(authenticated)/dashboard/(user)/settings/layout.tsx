import { Separator } from '@/components/ui/separator';
import { Bell, Palette, UserCog, Wrench } from 'lucide-react';
import { SidebarNavSettings } from '@/components/organisms/sidebar-nav-settings';

const sidebarNavItems = [
  {
    title: 'Perfil',
    href: '/dashboard/settings',
    icon: <UserCog size={18} />,
  },
  {
    title: 'Cuenta',
    href: '/dashboard/settings/account',
    icon: <Wrench size={18} />,
  },
  {
    title: 'Apariencia',
    href: '/dashboard/settings/appearance',
    icon: <Palette size={18} />,
  },
  {
    title: 'Notificaciones',
    href: '/dashboard/settings/notifications',
    icon: <Bell size={18} />,
  },
  //   {
  //   title: 'Display',
  //   href: '/settings/display',
  //   icon: <Monitor size={18} />,
  // },
];

export default function DashboardSettings({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="w-full p-4 md:p-6 max-w-7xl mx-auto">
      <div className="space-y-0.5">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>

      <Separator className="my-4 lg:my-6" />

      <section className="flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12">
        <aside className="top-0 lg:sticky lg:w-1/5">
          <SidebarNavSettings items={sidebarNavItems} />
        </aside>
        <div className="flex w-full overflow-y-hidden p-1">{children}</div>
      </section>
    </section>
  );
}
