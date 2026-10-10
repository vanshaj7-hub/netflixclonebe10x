"use client";

import { useMediaModal } from "@/components/modals/MediaModalContext";
import { cn } from "@/lib/cn";
import type { MediaItem } from "@/types/media";
import { Info, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TopTenCardProps {
  media: MediaItem;
  rank: number;
  className?: string;
}

export function TopTenCard({ media, rank, className }: TopTenCardProps) {
  const { openModal } = useMediaModal();

  return (
    <div
      className={cn(
        "group relative flex shrink-0 snap-start items-end gap-1 transition-transform duration-200 hover:z-20 hover:scale-105",
        className,
      )}
    >
      <span
        className="pointer-events-none -mr-4 select-none text-[7rem] leading-none font-black text-zinc-700/80 md:text-[8rem]"
        aria-hidden
      >
        {rank}
      </span>
      <div className="relative w-[140px] md:w-[160px]">
        <div className="relative aspect-[2/3] overflow-hidden rounded-md bg-zinc-800">
          <Image
            src={media.posterUrl}
            alt={media.title}
            fill
            sizes="160px"
            className="object-cover"
          />
          <span className="absolute top-2 left-2 rounded bg-primary px-1 text-[10px] font-bold">
            TOP 10
          </span>
          <div className="absolute inset-0 flex items-end gap-2 bg-gradient-to-t from-black/80 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
            <Link
              href={`/watch/${media.id}`}
              className="rounded-full bg-white p-1.5 text-black"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
            </Link>
            <button
              type="button"
              onClick={() => openModal(media.id)}
              className="rounded-full border border-white/60 p-1.5 text-white"
            >
              <Info className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
        <p className="mt-2 truncate text-sm">{media.title}</p>
        <p className="text-xs text-muted">
          {media.matchScore}% Match · {media.genres[0]}
        </p>
      </div>
    </div>
  );
}
