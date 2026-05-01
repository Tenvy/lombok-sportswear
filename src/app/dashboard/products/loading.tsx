import {
  DashboardShellSkeleton,
  DashboardContentSkeleton,
} from "../components/loading-skeleton";

export default function ProductsLoading() {
  return (
    <DashboardShellSkeleton>
      <DashboardContentSkeleton />
    </DashboardShellSkeleton>
  );
}
