"use client";

import { HeroBanner } from "@/components/hero/HeroBanner";
import { MediaRail } from "@/components/rails/MediaRail";
import { useHomeRails } from "@/hooks/useMediaList";
import { useUserMediaStore } from "@/stores/userMediaStore";
import { getMediaById } from "@/lib/media";

export function HomeView() {
  const { data, isLoading, isError } = useHomeRails();
  const continueWatching = useUserMediaStore((s) => s.continueWatching);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-muted">
        Loading catalog...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-primary">
        Failed to load content.
      </div>
    );
  }

  const continueItems = continueWatching
    .map((entry) => getMediaById(entry.mediaId))
    .filter(Boolean);

  return (
    <>
      <HeroBanner media={data.featured} />
      <div className="-mt-8 space-y-2 pb-12">
        {data.rails.map(({ rail, items }) => {
          if (rail.variant === "continue") {
            return (
              <MediaRail
                key={rail.id}
                rail={rail}
                items={continueItems as NonNullable<(typeof continueItems)[0]>[]}
                continueEntries={continueWatching}
              />
            );
          }
          return <MediaRail key={rail.id} rail={rail} items={items} />;
        })}
      </div>
    </>
  );
}
