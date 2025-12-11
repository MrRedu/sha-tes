'use client';
import { cn } from '@/lib/utils';
import { CardProject } from '@/components/molecules/card-project';
import { useProjects } from '@/hooks/use-projects';
import { useState } from 'react';
import { EmptyProjects } from './empty-projects';
import { HeaderProjects } from './header-projects';

import type { ProjectWithMembers } from '@/types/types';

interface ProjectsParams {
  _projects?: ProjectWithMembers[];
}

export const Projects = ({ _projects }: ProjectsParams) => {
  const { projects, form, onSubmit } = useProjects({
    _projects,
  });

  //? TODO: Tomar esto del localStorage
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const handleLayout = (layout: 'grid' | 'list'): void => setLayout(layout);

  if (projects?.length === 0)
    return <EmptyProjects form={form} onSubmit={onSubmit} />;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Proyectos</h1>
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
          `w-full  gap-4`,
          layout === 'grid'
            ? 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'flex flex-col'
        )}
      >
        {projects?.map((project) => {
          // Filtrar miembros aceptados
          const projectMembers = project?.members?.filter(
            (member) => member.status === 'member'
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
      </div>
    </div>
  );
};
