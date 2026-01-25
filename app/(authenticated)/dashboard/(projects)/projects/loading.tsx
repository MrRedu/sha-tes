import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingPage() {
  return (
    <section className="space-y-4 p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex gap-4 items-start md:items-center flex-col md:flex-row justify-between">
        <Skeleton className="h-10 w-40" />
        <div className="flex gap-4">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-40" />
        </div>
      </div>
      {/* Input */}
      <Skeleton className="h-10 w-full" />

      {/* Chips/Labels/Badges/Tags */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-40 rounded-full" />
        <Skeleton className="h-8 w-40 rounded-full" />
        <Skeleton className="h-8 w-40 rounded-full" />
        <Skeleton className="h-8 w-40 rounded-full" />
      </div>

      {/* Grid wrapper / Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Skeleton className="h-[250px] w-full col-span-1 md:col-span-2" />
        <Skeleton className="h-[250px] w-full col-span-1" />
        <Skeleton className="h-[250px] w-full col-span-1" />
        <Skeleton className="h-[250px] w-full col-span-1" />
        <Skeleton className="h-[250px] w-full col-span-1" />
        <Skeleton className="h-[250px] w-full col-span-1" />
      </div>
    </section>
  );
}
