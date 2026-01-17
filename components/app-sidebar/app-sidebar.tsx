'use client';
import { FolderKanban, Home, LayoutDashboard } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';

import { NavUser } from './nav-user';
import { ProjectSwitcher } from './project-switcher';
import { NavMain } from './nav-main';
import { useAuth } from '../auth/AuthProvider';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Project, Notebook } from '@/types/types';
import { ScrollArea } from '../ui/scroll-area';

type SidebarProject = Pick<Project, 'id' | 'name'> & {
  notebooks: Pick<Notebook, 'id' | 'name'>[];
};

export function AppSidebar() {
  const { user } = useAuth();
  const [dynamicProjects, setDynamicProjects] = useState<SidebarProject[]>([]);
  const supabase = createClient();

  useEffect(() => {
    if (!user) return;

    const fetchSidebarData = async () => {
      // Optimizamos la query pidiendo solo lo necesario
      const { data, error } = await supabase
        .from('tbl_projects')
        .select(
          `
          id, 
          name,
          notebooks:tbl_notebooks (id, name)
        `,
        )
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching sidebar data:', error);
        return;
      }

      setDynamicProjects(data as SidebarProject[]);
    };

    fetchSidebarData();
  }, [user]);

  const navGeneral = [
    {
      title: 'Panel principal',
      url: '/dashboard',
      icon: Home,
    },
    {
      title: 'Proyectos',
      url: '/dashboard/projects',
      icon: FolderKanban,
    },
  ];

  const navProjects = dynamicProjects.map((project) => ({
    title: project.name,
    url: `/dashboard/projects/${project.id}`,
    icon: LayoutDashboard,
    items: project.notebooks?.map((notebook) => ({
      title: notebook.name,
      url: `/dashboard/projects/${project.id}/notebooks/${notebook.id}`,
    })),
  }));

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        {/* <ProjectSwitcher
          projects={
            projectSwitcherData.length > 0
              ? projectSwitcherData
              : [{ name: 'Cargando...', logo: LayoutDashboard, plan: '' }]
          }
        /> */}
      </SidebarHeader>

      <SidebarContent className="flex flex-col gap-0 overflow-hidden">
        <NavMain items={navGeneral} label="General" />

        <ScrollArea className="flex-1 px-1 ">
          <div className="max-h-[300px]">
            <NavMain items={navProjects} label="Proyectos" />
          </div>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter>
        <NavUser
          user={{
            name:
              user?.user_metadata?.name ||
              user?.email?.split('@')[0] ||
              'Usuario',
            email: user?.email || '',
            avatar: user?.user_metadata?.avatar_url || '',
            avatarFallback: (user?.user_metadata?.name || user?.email || 'U')
              .slice(0, 2)
              .toUpperCase(),
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
