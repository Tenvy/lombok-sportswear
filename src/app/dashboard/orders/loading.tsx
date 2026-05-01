import {
  DashboardShellSkeleton,
  PageHeaderSkeleton,
  KpiCardSkeleton,
  TableSkeleton,
} from "../components/loading-skeleton";

export default function OrdersLoading() {
  return (
    <DashboardShellSkeleton>
      <PageHeaderSkeleton />
      <div className="mb-6 grid grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <KpiCardSkeleton key={i} />
        ))}
      </div>
      <TableSkeleton rows={10} cols={7} />
    </DashboardShellSkeleton>
  );
}
