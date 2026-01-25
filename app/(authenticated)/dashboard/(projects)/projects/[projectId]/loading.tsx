import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingPage() {
  return (
    <section className="space-y-4 p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="w-full flex flex-col md:flex-row items-start justify-between md:items-center gap-2">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-10 w-40" />
          <div className="flex gap-2">
            <Skeleton className="h-4 w-20 rounded-full" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
        {/* Actions */}
        <div className="flex gap-2 md:ml-auto">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>

      <Separator />

      {/* Summary cards */}
      <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Skeleton className="h-30 w-full" />
        <Skeleton className="h-30 w-full" />
        <Skeleton className="h-30 w-full" />
      </div>

      {/* Cards */}
      <Skeleton className="h-10 w-40" />
      <Separator />
      <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Skeleton className="h-30 w-full" />
        <Skeleton className="h-30 w-full" />
        <Skeleton className="h-30 w-full" />
        <Skeleton className="h-30 w-full" />
        <Skeleton className="h-30 w-full" />
        <Skeleton className="h-30 w-full" />
        <Skeleton className="h-30 w-full" />
      </div>
    </section>
  );
}
