import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingPage() {
  return (
    <section className="space-y-4">
      <div className="flex gap-2">
        <Skeleton className="h-10 w-40" />
        <div>
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
        <div className="flex gap-2 ml-auto">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
