import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingPage() {
  return (
    <section className="space-y-4 p-4 md:p-6">
      <div>
        <Skeleton className="h-10 w-40" />
      </div>
      <div className="flex gap-4">
        <Skeleton className="h-10 w-60" />
        <div className="ml-auto flex gap-4">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-40" />
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <Skeleton className="h-10 w-40 rounded-full" />
        <Skeleton className="h-10 w-40 rounded-full" />
        <Skeleton className="h-10 w-40 rounded-full" />
        <Skeleton className="h-10 w-40 rounded-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Skeleton className="h-[250px] w-full" />
        <Skeleton className="h-[250px] w-full" />
        <Skeleton className="h-[250px] w-full" />
        <Skeleton className="h-[250px] w-full" />
        <Skeleton className="h-[250px] w-full" />
        <Skeleton className="h-[250px] w-full" />
      </div>
    </section>
  );
}
