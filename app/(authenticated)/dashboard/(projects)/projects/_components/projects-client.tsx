'use client';

import type { ProjectWithMembers, RpcPendingProjects } from '@/types/types';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FolderInput, ArrowUpRightIcon, PlusIcon } from 'lucide-react';

import { HeaderProjects } from './header-projects';
import { CardProject } from './card-project';

import { useProjects } from '@/hooks/use-projects';

import { EmptyState } from '@/components/organisms/empty-state';

import { Button } from '@/components/ui/button';

import { DialogCreateProject } from '@/components/organisms/dialog-create-project';
import { DialogJoinProject } from '@/components/organisms/dialog-join-project';
import { CardPendingProject } from '@/components/molecules/card-pending-project';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface ProjectsParams {
  _projects: ProjectWithMembers[];
  _pendingProjectsRequests: RpcPendingProjects;
}

export const ProjectsClient = ({ _projects, _pendingProjectsRequests }: ProjectsParams) => {
  const {
    projects,
    form: formProjects,
    onSubmit: onSubmitProjects,
  } = useProjects({
    _projects,
  });

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

  // Empty state
  if (projects?.length === 0 && _pendingProjectsRequests?.length === 0) {
    return (
      <section className="w-full min-h-[calc(100svh-6rem)] grid place-items-center">
        <EmptyState
          icon={FolderInput}
          title="Sin proyectos aún"
          description="No has creado ningún proyecto todavía. Comienza creando tu primer proyecto."
          action={
            <div className="flex gap-2">
              <DialogCreateProject
                formProjects={formProjects}
                onSubmitProjects={onSubmitProjects}
              />
              <DialogJoinProject />
            </div>
          }
          footer={
            <Button variant="link" asChild className="text-muted-foreground" size="sm">
              <Link href="#">
                Learn More <ArrowUpRightIcon />
              </Link>
            </Button>
          }
        />
      </section>
    );
  }

  return (
    <section className="space-y-4 p-4 md:p-6">
      {/* Header */}
      <HeaderProjects formProjects={formProjects} onSubmitProjects={onSubmitProjects} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects?.map((project, index) => {
          return (
            <CardProject
              key={`project-${index}-${project.id}`}
              id={project.id}
              priority={project.priority}
              updated_at={project.updated_at}
              title={project.title}
              description={project.description}
              className={cn('w-full', index === 0 ? 'col-span-1 md:col-span-2' : 'col-span-1')}
              members={project.members}
            />
          );
        })}
        <DialogCreateProject
          formProjects={formProjects}
          onSubmitProjects={onSubmitProjects}
          triggerComponent={
            <Card className="h-full cursor-pointer cursor-pointer opacity-50 border-dashed border-2 hover:opacity-100 transition-opacity duration-300 ease-in-out gap-0 h-full text-center">
              <CardHeader>
                <h3>Crear proyecto</h3>
              </CardHeader>
              <CardContent>
                <PlusIcon />
              </CardContent>
            </Card>
          }
        />
      </div>
      {/* Cards */}
      <div className={cn(`w-full gap-4 grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5`)}>
        {pendingCards}
      </div>
    </section>
  );
};
