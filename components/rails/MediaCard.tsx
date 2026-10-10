"use client";

import { Badge } from "@/components/common/Badge";
import { useMediaModal } from "@/components/modals/MediaModalContext";
import { cn } from "@/lib/cn";
import type { MediaItem } from "@/types/media";
import { Info, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const awardLabels: Record<string, string> = {
  bafta: "BAFTA Winner",
  "certified-fresh": "98% Certified Fresh",
  "critics-choice": "Critics Choice Winner",
};

interface MediaCardProps {
  media: MediaItem;
  className?: string;
}

export function MediaCard({ media, className }: MediaCardProps) {
  const { openModal } = useMediaModal();

  return (
    <div
      className={cn(
        "group relative shrink-0 snap-start transition-transform duration-200 hover:z-20 hover:scale-105",
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
        {media.badges.includes("exclusive") && (
          <Badge variant="primary" className="absolute top-2 left-2">
            EXCLUSIVE
          </Badge>
        )}
        {media.badges.includes("original") && !media.badges.includes("exclusive") && (
          <Badge variant="primary" className="absolute top-2 left-2">
            ORIGINAL
          </Badge>
        )}
        <div className="absolute inset-0 flex items-end gap-2 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
          <Link
            href={`/watch/${media.id}`}
            className="rounded-full bg-white p-2 text-black hover:bg-white/90"
            aria-label="Play"
          >
            <Play className="h-4 w-4 fill-current" />
          </Link>
          <button
            type="button"
            onClick={() => openModal(media.id)}
            className="rounded-full border border-white/60 p-2 text-white hover:bg-white/20"
            aria-label="More info"
          >
            <Info className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="mt-2 space-y-1">
        <p className="truncate text-sm font-medium">{media.title}</p>
        <p className="text-xs text-muted">
          {media.matchScore}% Match · {media.genres[0]}
          {media.runtimeMinutes ? ` · ${media.runtimeMinutes}m` : ""}
        </p>
        <div className="flex flex-wrap gap-1">
          {media.awards.map((award) => (
            <Badge key={award} variant="award" className="text-[10px]">
              {awardLabels[award] ?? award}
            </Badge>
          ))}
          {media.formats.slice(0, 2).map((format) => (
            <span key={format} className="text-[10px] text-muted-dim">
              {format}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
