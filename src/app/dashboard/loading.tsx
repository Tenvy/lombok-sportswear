import {
  DashboardShellSkeleton,
  PageHeaderSkeleton,
  KpiCardSkeleton,
  ChartSkeleton,
  TableSkeleton,
} from "./components/loading-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <DashboardShellSkeleton>
      <PageHeaderSkeleton />
      <div className="mb-6 grid grid-cols-3 gap-4 xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <KpiCardSkeleton key={i} />
        ))}
      </div>
      <div className="mb-6 grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <ChartSkeleton />
        </div>
        <div className="col-span-4">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <Skeleton className="mb-1 h-4 w-32" />
            <Skeleton className="mb-5 h-3 w-40" />
            <Skeleton className="mx-auto mb-5 h-[150px] w-[150px] rounded-full" />
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-2.5 w-2.5 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-4 w-8" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mb-6 grid grid-cols-12 gap-4">
        <div className="col-span-5">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <Skeleton className="mb-1 h-4 w-32" />
            <Skeleton className="mb-5 h-3 w-40" />
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                  <Skeleton className="h-2 w-full rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-7 grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <Skeleton className="mb-4 h-4 w-32" />
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <Skeleton className="mb-4 h-4 w-24" />
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
      <TableSkeleton rows={5} cols={5} />
    </DashboardShellSkeleton>
  );
}
