import {
  DashboardShellSkeleton,
  DashboardContentSkeleton,
} from "../components/loading-skeleton";

export default function CategoryLoading() {
  return (
    <DashboardShellSkeleton>
      <DashboardContentSkeleton />
    </DashboardShellSkeleton>
  );
}
