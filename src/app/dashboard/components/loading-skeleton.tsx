import DashboardSidebar from "./sidebar";
import DashboardHeader from "./header";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardShellSkeleton({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto px-6 py-5">
          {children ?? <Skeleton className="h-[600px] w-full" />}
        </main>
      </div>
    </div>
  );
}

export function KpiCardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <Skeleton className="h-9 w-9 rounded-lg" />
        <Skeleton className="h-5 w-10 rounded" />
      </div>
      <Skeleton className="mb-1.5 h-3 w-24" />
      <Skeleton className="h-5 w-16" />
    </div>
  );
}

export function TableToolbarSkeleton() {
  return (
    <div className="mb-0 flex items-center justify-between gap-3 border-b border-gray-100 px-5 py-3">
      <div className="flex flex-1 items-center gap-2">
        <Skeleton className="h-9 w-[240px]" />
        <Skeleton className="h-9 w-[100px]" />
        <Skeleton className="h-9 w-[100px]" />
      </div>
      <Skeleton className="h-4 w-20" />
    </div>
  );
}

export function TableRowSkeleton({ cols = 6 }: { cols?: number }) {
  const widths = ["w-[40px]", "w-[200px]", "w-[100px]", "w-[80px]", "w-[80px]", "w-[100px]"];
  return (
    <tr className="border-b border-gray-50">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton className={`h-4 ${widths[i % widths.length]}`} />
        </td>
      ))}
    </tr>
  );
}

export function TableSkeleton({ rows = 8, cols = 6 }: { rows?: number; cols?: number }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <TableToolbarSkeleton />
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/60">
            {Array.from({ length: cols }).map((_, i) => (
              <th key={i} className="px-4 py-3">
                <Skeleton className="h-3 w-16" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <TableRowSkeleton key={i} cols={cols} />
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-9 w-48" />
      </div>
    </div>
  );
}

export function PageHeaderSkeleton() {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <Skeleton className="mb-1.5 h-5 w-40" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-9 w-24" />
        <Skeleton className="h-9 w-32" />
      </div>
    </div>
  );
}

export function DashboardContentSkeleton() {
  return (
    <div className="flex-1 px-6 py-5">
      <PageHeaderSkeleton />
      <div className="mb-5 grid grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <KpiCardSkeleton key={i} />
        ))}
      </div>
      <TableSkeleton />
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <Skeleton className="mb-1 h-4 w-32" />
          <Skeleton className="h-3 w-48" />
        </div>
        <div className="flex gap-1.5">
          <Skeleton className="h-6 w-8 rounded-md" />
          <Skeleton className="h-6 w-8 rounded-md" />
          <Skeleton className="h-6 w-8 rounded-md" />
        </div>
      </div>
      <Skeleton className="h-[200px] w-full rounded-lg" />
    </div>
  );
}
