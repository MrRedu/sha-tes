'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { Cloud, StickyNote, Users } from 'lucide-react';
import { useProjectDetails } from '@/hooks/use-projects';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface SummaryProjectProps {
  projectId: string;
}

export const SummaryProject = ({ projectId }: SummaryProjectProps) => {
  const { data: project } = useProjectDetails(projectId);

  // Calculate stats from data
  const TOTAL_NOTES_IN_ALL_NOTEBOOKS =
    project?.notebooks?.reduce((acc, nb: any) => acc + (nb.count_notes || 0), 0) || 0;
  const TOTAL_CONTRIBUTORS_IN_PROJECT =
    project?.members?.filter((m: any) => m.status === 'member' || m.status === 'owner').length || 0;

  const stats = [
    {
      title: 'Notas totales',
      value: TOTAL_NOTES_IN_ALL_NOTEBOOKS,
      icon: StickyNote,
    },
    {
      title: 'Uso de almacenamiento',
      value: '2.4GB',
      icon: Cloud,
      progress: 24,
    },
    {
      title: 'Contribuyentes',
      value: TOTAL_CONTRIBUTORS_IN_PROJECT,
      icon: Users,
      // description: `En ${Math.max(1, Math.floor(contributors / 2))} equipos`,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, idx) => (
        <Card
          key={idx}
          className={cn(
            'flex flex-col gap-0',
            stat.title === 'Uso de almacenamiento' &&
              'pointer-events-none cursor-not-allowed opacity-50'
          )}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <Typography className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
              {stat.title}
            </Typography>
            <stat.icon className="size-4 text-primary" />
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-2 justify-between">
              <Typography className="text-3xl font-bold">{stat.value}</Typography>
              {stat.progress !== undefined && (
                <div className="space-y-1.5 w-full">
                  <Progress value={stat.progress} className="h-1.5" />
                  <div className="flex justify-between">
                    <Typography variant="small">2.4GB en uso</Typography>
                    <Typography variant="small">10GB totales</Typography>
                  </div>
                </div>
              )}
            </div>

            {/* {stat.description && !stat.progress && (
              <Typography variant="muted" className="text-xs">
                {stat.description}
              </Typography>
            )} */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
