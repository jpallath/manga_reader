import { RecentChapters } from "@/components/ui/recentChapters";
import { Suspense } from "react";
import { RecentChaptersSkeleton } from "@/components/ui/skeletons/recentChaptersSkeleton";
import { FeaturedSeriesSkeleton } from "@/components/ui/skeletons/featuredSeriesSkeleton";
import { FeaturedSeries } from "@/components/ui/featuredSeries";

export default async function Home() {
  return (
    <div>
      <Suspense fallback={<FeaturedSeriesSkeleton />}>
        <FeaturedSeries />
      </Suspense>
      <Suspense fallback={<RecentChaptersSkeleton />}>
        <RecentChapters />
      </Suspense>
    </div>
  );
}
