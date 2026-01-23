import { DialogCreateProject } from '@/components/organisms/dialog-create-project';
import { DialogJoinProject } from '@/components/organisms/dialog-join-project';
import { Typography } from '@/components/ui/typography';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProjectStore } from '@/hooks/use-project-store';

import { STATUS_OPTIONS } from '@/lib/constants';

const FILTER_LABELS = [
  { value: 'all', label: 'Todos' },
  ...STATUS_OPTIONS
];

export const HeaderProjects = () => {
  const { searchQuery, setSearchQuery, statusFilter, setStatusFilter } = useProjectStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-col md:flex-row gap-4">
        <div className='w-full'>
          <Typography variant="h1" className="text-2xl! text-start">
            Proyectos
          </Typography>
        </div>
        <div className="flex flex-wrap gap-2 w-full justify-start md:justify-end">
          <DialogJoinProject />
          <DialogCreateProject />
        </div>
      </div>
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por nombres, etiquetas o contenido..."
          type="search"
          className="pl-10 h-12"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex items-center flex-wrap gap-2">
        {FILTER_LABELS.map((filter) => (
          <Button
            key={filter.value}
            className="rounded-full px-4"
            size="sm"
            variant={filter.value === statusFilter ? 'default' : 'secondary'}
            onClick={() => setStatusFilter(filter.value)}
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
