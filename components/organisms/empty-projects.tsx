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
import Link from 'next/link';

interface EmptyProjectsProps {
  // TODO: fix types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: any;
}
export function EmptyProjects({ form, onSubmit }: EmptyProjectsProps) {
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
        <Link href="#">
          Learn More <ArrowUpRightIcon />
        </Link>
      </Button>
    </Empty>
  );
}
