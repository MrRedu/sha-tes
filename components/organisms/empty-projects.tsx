'use client';
import { ArrowUpRightIcon, FolderInput } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { DialogCreateProject } from './dialog-create-project';
import { DialogJoinProject } from './dialog-join-project';

export function EmptyProjects({ form, onSubmit }: any) {
  return (
    <Empty className="w-full  min-h-[calc(100svh-6rem)]">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderInput />
        </EmptyMedia>
        <EmptyTitle>Sin proyectos aún</EmptyTitle>
        <EmptyDescription>
          No has creado ningún proyecto todavía. Comienza creando tu primer
          proyecto.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <DialogCreateProject form={form} onSubmit={onSubmit} />
          <DialogJoinProject />
        </div>
      </EmptyContent>
      <Button
        variant="link"
        asChild
        className="text-muted-foreground"
        size="sm"
      >
        <a href="#">
          Learn More <ArrowUpRightIcon />
        </a>
      </Button>
    </Empty>
  );
}
