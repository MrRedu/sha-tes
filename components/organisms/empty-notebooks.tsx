import { ArrowUpRightIcon, FilePlusCorner } from 'lucide-react';
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
} from '@/components/ui/empty';
import { Button } from '@/components/ui/button';
import { DialogCreateNotebook } from '../molecules/dialog-create-notebook';

interface EmptyNotebooksProps {
  // TODO: fix types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: any;
}

export const EmptyNotebooks = ({ form, onSubmit }: EmptyNotebooksProps) => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FilePlusCorner />
        </EmptyMedia>
        {/* <EmptyTitle>No Notebooks Yet</EmptyTitle> */}
        <EmptyTitle>Sin notebooks aún</EmptyTitle>
        <EmptyDescription>
          No has creado ningún notebook dentro de tu proyecto. Comienza creando
          tu primer notebook.
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <DialogCreateNotebook form={form} onSubmit={onSubmit} />
      </EmptyContent>
    </Empty>
  );
};
