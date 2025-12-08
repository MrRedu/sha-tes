'use client';
import {
  Calendar,
  FolderKanban,
  Home,
  LayoutDashboard,
  Settings,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';

import { NavUser } from './nav-user';
import { ProjectSwitcher } from './project-switcher';
import { NavMain } from './nav-main';
import { useAuth } from '../auth/AuthProvider';

const items = [
  {
    title: 'Panel principal',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Proyectos',
    url: '/dashboard',
    icon: FolderKanban,
  },
  // {
  //   title: 'Buscar',
  //   url: '#',
  //   icon: Search,
  // },
  // {
  //   title: 'Configuraciones',
  //   url: '#',
  //   icon: Settings,
  // },
];

const projects = [
  {
    name: 'Project Alpha',
    logo: LayoutDashboard,
    plan: 'Pro Plan',
  },
  {
    name: 'Project Beta',
    logo: Calendar,
    plan: 'Free Plan',
  },
  {
    name: 'Project Gamma',
    logo: Settings,
    plan: 'Enterprise Plan',
  },
];

export function AppSidebar() {
  const { user } = useAuth();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <ProjectSwitcher projects={projects} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={items} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: user?.user_metadata?.name || 'Name Lastname',
            email: user?.user_metadata?.email || 'example@me.com',
            avatar: user?.user_metadata?.avatar_url || '',
            avatarFallback: (user?.user_metadata?.name || 'NL')
              .slice(0, 2)
              .toUpperCase(), // First two letters of the name as fallback
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
