'use client';
import { cn } from '@/lib/utils';
import { CardProject } from '@/components/molecules/card-project';
import { useProjects } from '@/hooks/use-projects';
import { useState } from 'react';
import { EmptyProjects } from './empty-projects';
import { HeaderProjects } from './header-projects';

import type { ProjectWithMembers, RpcPendingProject } from '@/types/types';
import { CardPendingProject } from '@/components/molecules/card-pending-project';
import { Typography } from '@/components/ui/typography';

interface ProjectsParams {
  _projects?: ProjectWithMembers[];
  _pendingProjectsRequests?: RpcPendingProject[];
}

export const Projects = ({
  _projects = [],
  _pendingProjectsRequests = [],
}: ProjectsParams) => {
  const { projects, form, onSubmit } = useProjects({
    _projects,
  });

  //? TODO: Tomar esto del localStorage
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const handleLayout = (layout: 'grid' | 'list'): void => setLayout(layout);

  const pendingCards =
    _pendingProjectsRequests?.length >= 1
      ? _pendingProjectsRequests.map((entry, index) => (
          <CardPendingProject
            key={`pending-${index}`}
            name={entry?.project_name || ''}
            ownerName={entry?.owner_full_name || ''}
          />
        ))
      : null;

  if (projects?.length === 0 && _pendingProjectsRequests?.length === 0) {
    return (
      <section className="w-full min-h-[calc(100svh-6rem)]">
        <EmptyProjects form={form} onSubmit={onSubmit} />
      </section>
    );
  }
  return (
    <section className="space-y-4">
      <div className="w-full flex items-center gap-4">
        <Typography variant="h1" className="text-2xl!">
          Proyectos
        </Typography>
      </div>
      {/* Header */}
      <HeaderProjects
        layout={layout}
        handleLayout={handleLayout}
        form={form}
        onSubmit={onSubmit}
      />
      {/* Cards */}
      <div
        className={cn(
          `w-full gap-4 `,
          layout === 'grid'
            ? 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'flex flex-col',
        )}
      >
        {projects?.map((project) => {
          // Filtrar miembros aceptados (Lógica de filtrado mantenida)
          const projectMembers = project?.members?.filter(
            (member) => member.status === 'member',
          );

          return (
            <CardProject
              key={project.id}
              id={project.id}
              name={project.name}
              description={project.description}
              members={projectMembers}
            />
          );
        })}

        {pendingCards}
      </div>
    </section>
  );
};
