import { type FormCreateProjectType } from '@/hooks/validations/use-projects.schema';
import { type UseFormReturn } from 'react-hook-form';
import { DialogCreateProject } from '@/components/organisms/dialog-create-project';
import { DialogJoinProject } from '@/components/organisms/dialog-join-project';
import { Typography } from '@/components/ui/typography';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HeaderProjectsProps {
  formProjects: UseFormReturn<FormCreateProjectType>;
  onSubmitProjects: () => void;
}

const FILTER_LABELS = [
  {
    value: 'all',
    label: 'Todos',
  },
  {
    value: 'active',
    label: 'Activos',
  },
  {
    value: 'inactive',
    label: 'En revisión',
  },
  {
    value: 'archived',
    label: 'Archivados',
  },
  {
    value: 'featured',
    label: 'Destacados',
  },
];

export const HeaderProjects = ({ formProjects, onSubmitProjects }: HeaderProjectsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Typography variant="h1" className="text-2xl!">
            Proyectos
          </Typography>
        </div>
        <div className="flex gap-2">
          <DialogJoinProject />
          <DialogCreateProject formProjects={formProjects} onSubmitProjects={onSubmitProjects} />
        </div>
      </div>
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por nombres, etiquetas o contenido..."
          type="search"
          className="pl-10 h-12"
        />
      </div>
      <div className="flex items-center flex-wrap gap-2">
        {FILTER_LABELS.map((filter) => (
          <Button
            key={filter.value}
            className="rounded-full px-4"
            size="sm"
            variant={filter.value === 'all' ? 'default' : 'secondary'}
          >
            <span className="text-xs">
              {filter.value === 'featured' && <>{'⭐ '}</>}
              {filter.label}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};
