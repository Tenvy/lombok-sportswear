import {
  DashboardShellSkeleton,
  PageHeaderSkeleton,
  KpiCardSkeleton,
  TableSkeleton,
} from "../components/loading-skeleton";

export default function CustomersLoading() {
  return (
    <DashboardShellSkeleton>
      <PageHeaderSkeleton />
      <div className="mb-6 grid grid-cols-2 gap-4 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <KpiCardSkeleton key={i} />
        ))}
      </div>
      <TableSkeleton rows={10} cols={8} />
    </DashboardShellSkeleton>
  );
}
