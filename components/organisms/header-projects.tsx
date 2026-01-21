import { Grid3x3, Rows3, SearchIcon } from 'lucide-react';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { ButtonGroup } from '../ui/button-group';
import { Button } from '../ui/button';
import { DialogJoinProject } from './dialog-join-project';
import { DialogCreateProject } from './dialog-create-project';

interface HeaderProjectsProps {
  layout: 'grid' | 'list';
  handleLayout: (layout: 'grid' | 'list') => void;
  // TODO
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  onSubmit: () => void;
}

export const HeaderProjects = ({
  layout,
  handleLayout,
  form,
  onSubmit,
}: HeaderProjectsProps) => {
  return (
    <div className="w-full flex items-center justify-between flex-col md:flex-row gap-4">
      <div className="flex gap-2 w-full">
        <div className="relative w-full max-w-xs">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Buscar" type="search" className="pl-10" />
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="shared" />
          <Label htmlFor="shared">Compartidos</Label>
        </div>
      </div>
      <div className="flex gap-2 flex-col md:flex-row w-full md:w-auto">
        <ButtonGroup className="hidden md:flex">
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
        <div className="flex gap-2">
          <DialogJoinProject />
          <DialogCreateProject form={form} onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};
