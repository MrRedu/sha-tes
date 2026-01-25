'use client';

import Link from 'next/link';
import { CardCurrentProject } from './card-current-project';
import { useQuery } from '@tanstack/react-query';
import { actions } from '@/actions';
import { Skeleton } from '@/components/ui/skeleton';

export const CurrentProjects = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['projects', { limit: 2 }],
    queryFn: () => actions.projects.fetchProjects(0, 1),
  });

  const projects = data?.projects || [];

  if (isLoading) {
    return (
      <section className="w-full space-y-4">
        <div className="w-full flex items-center justify-between">
          <h3 className="text-lg font-semibold">Proyectos actuales</h3>
          <div className="h-4 w-16 bg-muted animate-pulse rounded" />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-[200px] w-full" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full p-4 border border-destructive/50 bg-destructive/10 rounded-lg">
        <p className="text-destructive text-sm">Error los proyectos recientes</p>
      </section>
    );
  }

  return (
    <section className="w-full space-y-4">
      <div className="w-full flex items-center justify-between">
        <h3 className="text-lg font-semibold">Proyectos actuales</h3>
        <Link href="/dashboard/projects" className="hover:underline text-sm text-muted-foreground">
          Ver todos
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="p-8 border border-dashed rounded-lg text-center">
          <p className="text-muted-foreground text-sm">No hay proyectos activos todavía.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <CardCurrentProject
              key={project.id}
              id={project.id}
              status={project.status as any}
              title={project.title}
              members={project.members as any}
              description={project.description || ''}
              updatedAt={project.updated_at}
            />
          ))}
        </div>
      )}
    </section>
  );
};
