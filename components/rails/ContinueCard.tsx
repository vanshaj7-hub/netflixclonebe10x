"use client";

import { useMediaModal } from "@/components/modals/MediaModalContext";
import { cn } from "@/lib/cn";
import { useUserMediaStore } from "@/stores/userMediaStore";
import type { ContinueWatchingEntry, MediaItem } from "@/types/media";
import { Info, Play, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ContinueCardProps {
  media: MediaItem;
  entry: ContinueWatchingEntry;
  className?: string;
}

export function ContinueCard({ media, entry, className }: ContinueCardProps) {
  const removeFromContinue = useUserMediaStore((s) => s.removeFromContinue);
  const { openModal } = useMediaModal();

  return (
    <div
      className={cn(
        "group relative shrink-0 snap-start transition-transform duration-200 hover:z-20 hover:scale-[1.02]",
        className,
      )}
    >
      <div className="relative aspect-video overflow-hidden rounded-md bg-zinc-800">
        <Image
          src={media.backdropUrl}
          alt={media.title}
          fill
          sizes="(max-width:768px) 45vw, (max-width:1280px) 25vw, 16vw"
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-end gap-2 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
          <Link
            href={`/watch/${media.id}`}
            className="rounded-full bg-white p-2 text-black"
          >
            <Play className="h-4 w-4 fill-current" />
          </Link>
          <button
            type="button"
            onClick={() => openModal(media.id)}
            className="rounded-full border border-white/60 p-2 text-white"
          >
            <Info className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => removeFromContinue(media.id)}
            className="rounded-full border border-white/60 p-2 text-white"
            aria-label="Remove from Continue Watching"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="absolute right-0 bottom-0 left-0 h-1 bg-white/20">
          <div
            className="h-full bg-primary"
            style={{ width: `${entry.progressPercent}%` }}
          />
        </div>
      </div>
      <p className="mt-2 truncate text-sm font-medium">{entry.label}</p>
      <p className="text-xs text-muted">{entry.remainingMinutes}m left</p>
    </div>
  );
}
