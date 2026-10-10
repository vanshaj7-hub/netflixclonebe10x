"use client";

import { getMediaById } from "@/lib/media";
import { useUserMediaStore } from "@/stores/userMediaStore";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useRef } from "react";

interface WatchPlayerProps {
  mediaId: string;
}

export function WatchPlayer({ mediaId }: WatchPlayerProps) {
  const media = getMediaById(mediaId);
  const router = useRouter();
  const updateProgress = useUserMediaStore((s) => s.updateProgress);
  const lastPersist = useRef(0);

  const onTimeUpdate = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      const video = e.currentTarget;
      if (!media || !video.duration || Number.isNaN(video.duration)) return;
      const now = Date.now();
      if (now - lastPersist.current < 10_000) return;
      lastPersist.current = now;
      const progressPercent = Math.round(
        (video.currentTime / video.duration) * 100,
      );
      const remainingMinutes = Math.max(
        1,
        Math.round((video.duration - video.currentTime) / 60),
      );
      updateProgress({
        mediaId: media.id,
        progressPercent,
        remainingMinutes,
        label: media.title,
        episodeId: media.episodes?.[0]?.id,
      });
    },
    [media, updateProgress],
  );

  if (!media) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Title not found.</p>
        <Link href="/" className="ml-4 text-primary underline">
          Home
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black">
      <button
        type="button"
        onClick={() => router.back()}
        className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded bg-black/50 px-3 py-2 text-sm hover:bg-black/70"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>
      <video
        className="h-screen w-full object-contain"
        src={media.playbackUrl}
        controls
        autoPlay
        onTimeUpdate={onTimeUpdate}
      />
    </div>
  );
}
