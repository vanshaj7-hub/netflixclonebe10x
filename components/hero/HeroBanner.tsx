"use client";

import { Badge } from "@/components/common/Badge";
import { useMediaModal } from "@/components/modals/MediaModalContext";
import type { MediaItem } from "@/types/media";
import { Info, Play, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface HeroBannerProps {
  media: MediaItem;
}

export function HeroBanner({ media }: HeroBannerProps) {
  const { openModal } = useMediaModal();
  const [muted, setMuted] = useState(true);

  const synopsis =
    media.synopsis.length > 240
      ? `${media.synopsis.slice(0, 237)}...`
      : media.synopsis;

  return (
    <section className="relative -mt-16 aspect-[21/9] min-h-[420px] w-full overflow-hidden bg-surface-lowest">
      <Image
        src={media.backdropUrl}
        alt={media.title}
        fill
        priority
        sizes="100vw"
        className="object-cover object-top"
      />
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-40"
        src={media.trailerUrl}
        autoPlay
        loop
        muted={muted}
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-r from-surface-lowest via-surface-lowest/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-surface-lowest via-transparent to-black/30" />

      <div className="relative z-10 flex h-full max-w-3xl flex-col justify-end px-4 pb-16 pt-24 md:px-10 md:pb-20">
        {media.heroRankLabel && (
          <Badge variant="rank" className="mb-3 w-fit text-[11px]">
            {media.heroRankLabel}
          </Badge>
        )}
        <h1 className="text-3xl font-black tracking-tight uppercase md:text-5xl">
          {media.title}
        </h1>
        <div className="mt-3 flex min-h-[28px] flex-wrap items-center gap-2 text-sm">
          <span className="font-semibold text-green-400">
            {media.matchScore}% Match
          </span>
          <span className="text-muted">{media.year}</span>
          <Badge variant="outline">{media.maturity}</Badge>
          {media.seasonCount && (
            <span className="text-muted">{media.seasonCount} Seasons</span>
          )}
          {media.formats.map((format) => (
            <Badge key={format} variant="outline">
              {format}
            </Badge>
          ))}
        </div>
        <p className="mt-4 line-clamp-3 max-w-xl text-sm text-zinc-200 md:text-base">
          {synopsis}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/watch/${media.id}`}
            className="inline-flex items-center gap-2 rounded bg-white px-6 py-2.5 text-sm font-bold text-black transition hover:bg-white/90"
          >
            <Play className="h-5 w-5 fill-current" />
            Play
          </Link>
          <button
            type="button"
            onClick={() => openModal(media.id)}
            className="inline-flex items-center gap-2 rounded bg-white/25 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/35"
          >
            <Info className="h-5 w-5" />
            More Info
          </button>
        </div>
      </div>

      <div className="absolute right-6 bottom-20 z-10 flex items-center gap-3 md:right-10">
        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          className="rounded-full border border-white/50 p-2 text-white hover:bg-white/10"
          aria-label={muted ? "Unmute preview" : "Mute preview"}
        >
          {muted ? (
            <VolumeX className="h-5 w-5" />
          ) : (
            <Volume2 className="h-5 w-5" />
          )}
        </button>
        <div className="rounded border border-white/40 px-2 py-1 text-xs text-white">
          16+
        </div>
      </div>
    </section>
  );
}
