'use client';

import { useProjectDetails, useNotebookMutations } from '@/hooks/use-projects';
import type { User, Notebook, Project } from '@/types/types';
import { DialogCreateNotebook } from '@/components/molecules/dialog-create-notebook';
import { CardNotebook } from './card-notebook';
import { EmptyState } from '@/components/organisms/empty-state';
import { FilePlusCorner, Loader2 } from 'lucide-react';
import { notFound } from 'next/navigation';
import { HeaderProject } from './header-project';
import { Separator } from '@/components/ui/separator';
import { SummaryProject } from './summary-project';

export interface ProjectProps {
  userId: User['id'];
  projectId: Project['id'];
}

export const ProjectClient = ({ userId, projectId }: ProjectProps) => {
  const { data: project, isLoading, error } = useProjectDetails(projectId);
  const { form: formCreateNotebook, onSubmit: onSubmitCreateNotebook } =
    useNotebookMutations(projectId);

  if (isLoading) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) return <div>Error al cargar el proyecto</div>;
  if (!project) return notFound();

  return (
    <section className="space-y-4 p-4 md:p-6">
      <HeaderProject projectId={projectId} userId={userId} />
      <Separator />
      <SummaryProject projectId={projectId} />

      {project.notebooks?.length === 0 && (
        <section className="w-full flex items-center justify-center min-h-[calc(100vh-200px)]">
          <EmptyState
            icon={FilePlusCorner}
            title="Sin notebooks aún"
            description="No has creado ningún notebook dentro de tu proyecto. Comienza creando tu primer notebook."
            action={
              <DialogCreateNotebook form={formCreateNotebook} onSubmit={onSubmitCreateNotebook} />
            }
          />
        </section>
      )}

      {project.notebooks?.length > 0 && (
        <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {project.notebooks.map((notebook: Notebook) => (
            <CardNotebook
              key={notebook.id}
              projectId={project.id}
              notebookId={notebook.id}
              name={notebook.name}
              description={notebook.description}
              updated_at={notebook.updated_at}
              count_notes={notebook.count_notes}
            />
          ))}
          <DialogCreateNotebook form={formCreateNotebook} onSubmit={onSubmitCreateNotebook} />
        </div>
      )}
    </section>
  );
};
