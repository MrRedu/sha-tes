'use client';
import {
  Calendar,
  Home,
  LayoutDashboard,
  Search,
  Settings,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

import { NavUser } from './nav-user';
import { ProjectSwitcher } from './project-switcher';
import { NavMain } from './nav-main';

const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Calendar',
    url: '#',
    icon: Calendar,
  },
  {
    title: 'Search',
    url: '#',
    icon: Search,
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
  },
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

const user = {
  name: 'Jane Smith',
  email: 'janesmith@me.com',
  avatar: '',
};

export function AppSidebar() {
  const isLogged = false;
  const { open: sideBarIsOpen } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        {isLogged ? (
          <ProjectSwitcher projects={projects} />
        ) : (
          <div className="flex items-center">
            {sideBarIsOpen ? (
              <h3 className="text-lg font-bold ml-2">ShaTes</h3>
            ) : null}
            <SidebarTrigger variant="ghost" size="icon" className="ml-auto" />
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={items} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
