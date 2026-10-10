"use client";

import { ContinueCard } from "@/components/rails/ContinueCard";
import { MediaCard } from "@/components/rails/MediaCard";
import { TopTenCard } from "@/components/rails/TopTenCard";
import { cn } from "@/lib/cn";
import { useUserMediaStore } from "@/stores/userMediaStore";
import type { ContinueWatchingEntry, MediaItem, RailDefinition } from "@/types/media";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

interface MediaRailProps {
  rail: RailDefinition;
  items: MediaItem[];
  continueEntries?: ContinueWatchingEntry[];
}

export function MediaRail({ rail, items, continueEntries }: MediaRailProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const activeProfile = useUserMediaStore((s) => s.activeProfile);
  const storeContinue = useUserMediaStore((s) => s.continueWatching);

  const title =
    rail.dynamicTitle && rail.variant === "continue"
      ? `Continue Watching for ${activeProfile}`
      : rail.title;

  const entries =
    rail.variant === "continue"
      ? (continueEntries ?? storeContinue)
      : undefined;

  const scrollBy = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const onWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    const el = scrollRef.current;
    if (!el) return;
    e.preventDefault();
    el.scrollLeft += e.deltaY;
  };

  const cardWidth =
    rail.variant === "top10"
      ? "min-w-[200px] md:min-w-[220px]"
      : "min-w-[45%] sm:min-w-[32%] md:min-w-[24%] lg:min-w-[16%] xl:min-w-[14%]";

  if (rail.variant === "continue" && entries && entries.length === 0) {
    return null;
  }

  return (
    <section
      className="relative mb-8 px-4 md:px-10"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h2 className="mb-3 text-lg font-bold md:text-xl">{title}</h2>
      <div className="relative">
        {hovered && (
          <>
            <button
              type="button"
              aria-label="Scroll left"
              onClick={() => scrollBy("left")}
              className="absolute top-1/2 left-0 z-10 hidden -translate-y-1/2 rounded-r bg-black/60 p-2 hover:bg-black/80 md:block"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              aria-label="Scroll right"
              onClick={() => scrollBy("right")}
              className="absolute top-1/2 right-0 z-10 hidden -translate-y-1/2 rounded-l bg-black/60 p-2 hover:bg-black/80 md:block"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
        <div
          ref={scrollRef}
          onWheel={onWheel}
          className="scrollbar-hide flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2"
        >
          {rail.variant === "continue" &&
            entries?.map((entry) => {
              const media = items.find((i) => i.id === entry.mediaId);
              if (!media) return null;
              return (
                <ContinueCard
                  key={entry.mediaId}
                  media={media}
                  entry={entry}
                  className={cardWidth}
                />
              );
            })}
          {rail.variant === "top10" &&
            items.map((media, index) => (
              <TopTenCard
                key={media.id}
                media={media}
                rank={index + 1}
                className={cardWidth}
              />
            ))}
          {rail.variant === "standard" &&
            items.map((media) => (
              <MediaCard key={media.id} media={media} className={cardWidth} />
            ))}
        </div>
      </div>
    </section>
  );
}
