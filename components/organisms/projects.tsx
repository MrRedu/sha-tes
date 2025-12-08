'use client';
import { CardProject } from '@/components/molecules/card-project';
import { DialogCreateProject } from '@/components/organisms/dialog-create-project';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import type { User, Project } from '@/hooks/types/types';
import { useProjects } from '@/hooks/use-projects';
import { cn } from '@/lib/utils';
import { Grid3x3, Rows3, SearchIcon } from 'lucide-react';
import { useState } from 'react';

interface ProjectsParams {
  projects: Project[];
  members: User[];
}

export const Projects = ({ projects, members }: ProjectsParams) => {
  const { _projects, form, onSubmit } = useProjects({ projects });

  // TODO: Tomar esto del localStorage
  const [layout, setLayout] = useState('grid');
  const handleLayout = (layout: 'grid' | 'list'): void => setLayout(layout);

  console.log(layout);
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Proyectos</h1>
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-4 flex-col md:flex-row gap-4">
        <div className="flex gap-2">
          <div className="relative w-full max-w-sm">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar" type="search" className="pl-10 " />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="shared" />
            <Label htmlFor="shared">Compartidos</Label>
          </div>
        </div>
        <div className="flex gap-2">
          <ButtonGroup>
            <Button
              type="button"
              onClick={() => handleLayout('list')}
              variant={`${layout === 'list' ? 'secondary' : 'outline'}`}
              size="icon-sm"
              aria-label="List"
            >
              <Rows3 />
            </Button>
            <Button
              type="button"
              onClick={() => handleLayout('grid')}
              variant={`${layout === 'grid' ? 'secondary' : 'outline'}`}
              size="icon-sm"
              aria-label="Grid"
            >
              <Grid3x3 />
            </Button>
          </ButtonGroup>
          <DialogCreateProject form={form} onSubmit={onSubmit} />
        </div>
      </div>
      {/* Cards */}
      <div
        className={cn(
          `w-full  gap-4`,
          layout === 'grid'
            ? 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'flex flex-col'
        )}
      >
        {_projects?.map((project) => {
          // Filtrar miembros específicos de este proyecto
          const projectMembers =
            members?.filter((member) => project.members?.includes(member.id)) ||
            [];

          return (
            <CardProject
              key={project.id}
              project={project}
              projectMembers={projectMembers}
            />
          );
        })}
      </div>
    </div>
  );
};
