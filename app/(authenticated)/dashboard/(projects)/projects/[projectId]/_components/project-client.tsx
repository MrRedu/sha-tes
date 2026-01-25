'use client';

import { useProjectDetails } from '@/hooks/use-projects';
import type { User, Notebook, Project } from '@/types/types';
import { DialogCreateNotebook } from '@/components/molecules/dialog-create-notebook';
import { CardNotebook } from './card-notebook';
import { EmptyState } from '@/components/organisms/empty-state';
import { FilePlusCorner, PlusIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import { HeaderProject } from './header-project';
import { Separator } from '@/components/ui/separator';
import { SummaryProject } from './summary-project';
import { Typography } from '@/components/ui/typography';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export interface ProjectProps {
  userId: User['id'];
  projectId: Project['id'];
}

export const ProjectClient = ({ userId, projectId }: ProjectProps) => {
  const { data: project, error } = useProjectDetails(projectId);

  if (!project) return notFound();
  if (error) return <div>Error al cargar el proyecto</div>;

  return (
    <section className="space-y-4 p-4 md:p-6 max-w-7xl mx-auto">
      <HeaderProject projectId={projectId} userId={userId} />
      <Separator />
      <SummaryProject projectId={projectId} />

      <Typography variant="h2" className="text-lg">
        Notebooks
      </Typography>
      {project.notebooks?.length === 0 && (
        <section className="w-full flex items-center justify-center min-h-[calc(100vh-400px)]">
          <EmptyState
            icon={FilePlusCorner}
            title="Sin bloc de notas aún"
            description="No has creado ningún bloc de notas dentro de tu proyecto. Comienza creando tu primer bloc de notas."
            action={<DialogCreateNotebook projectId={projectId} />}
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
          <DialogCreateNotebook
            projectId={projectId}
            triggerComponent={
              <Card
                className={
                  'h-full cursor-pointer border-dashed border-2 transition-all duration-300 text-center bg-transparent opacity-50 hover:opacity-100 gap-0 justify-center'
                }
              >
                <CardHeader className="flex items-center justify-center">
                  <Button className="rounded-full" variant="secondary" size="icon-lg">
                    <PlusIcon className="size-6" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <h3>Crear nuevo notebook</h3>
                </CardContent>
                <CardFooter className="flex items-center justify-center">
                  <Typography variant="xsmall" className="mt-0!">
                    Crea una nueva sección a tu proyecto.
                  </Typography>
                </CardFooter>
              </Card>
            }
          />
        </div>
      )}
    </section>
  );
};
