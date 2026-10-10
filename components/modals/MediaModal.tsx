"use client";

import { Badge } from "@/components/common/Badge";
import { MediaCard } from "@/components/rails/MediaCard";
import { useMediaModal } from "@/components/modals/MediaModalContext";
import { useMediaDetail } from "@/hooks/useMediaList";
import { getSimilarMedia } from "@/lib/media";
import { useUserMediaStore } from "@/stores/userMediaStore";
import { Plus, X } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export function MediaModal() {
  const { mediaId, closeModal } = useMediaModal();
  const { data: media, isLoading } = useMediaDetail(mediaId);
  const toggleMyList = useUserMediaStore((s) => s.toggleMyList);
  const isInMyList = useUserMediaStore((s) => s.isInMyList);

  useEffect(() => {
    if (!mediaId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [mediaId, closeModal]);

  if (!mediaId) return null;

  const similar = media ? getSimilarMedia(media) : [];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/70 p-4 pt-20"
      role="dialog"
      aria-modal="true"
      aria-label="Media details"
      onClick={closeModal}
    >
      <div
        className="relative w-full max-w-4xl overflow-hidden rounded-lg bg-zinc-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-3 right-3 z-10 rounded-full bg-black/60 p-2 hover:bg-black/80"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        {isLoading || !media ? (
          <div className="p-12 text-center text-muted">Loading...</div>
        ) : (
          <>
            <div className="relative aspect-video bg-black">
              <video
                src={media.trailerUrl}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-4 p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/watch/${media.id}`}
                  className="rounded bg-white px-5 py-2 text-sm font-bold text-black"
                >
                  Play
                </Link>
                <button
                  type="button"
                  onClick={() => toggleMyList(media.id)}
                  className="flex items-center gap-2 rounded border border-white/40 px-4 py-2 text-sm hover:bg-white/10"
                >
                  <Plus className="h-4 w-4" />
                  {isInMyList(media.id) ? "In My List" : "My List"}
                </button>
              </div>
              <h2 className="text-2xl font-bold">{media.title}</h2>
              <div className="flex flex-wrap gap-2 text-sm text-green-400">
                <span>{media.matchScore}% Match</span>
                <span className="text-muted">{media.year}</span>
                <Badge variant="outline">{media.maturity}</Badge>
              </div>
              <p className="text-sm leading-relaxed text-zinc-300">
                {media.synopsis}
              </p>
              <div className="grid gap-4 text-sm md:grid-cols-2">
                <p>
                  <span className="text-muted">Cast: </span>
                  {media.cast.join(", ")}
                </p>
                <p>
                  <span className="text-muted">Creators: </span>
                  {media.creators.join(", ")}
                </p>
                <p>
                  <span className="text-muted">Audio / Subtitles: </span>
                  {media.languages.join(", ")}
                </p>
              </div>
              {media.episodes && media.episodes.length > 0 && (
                <div>
                  <h3 className="mb-2 font-semibold">Episodes</h3>
                  <ul className="space-y-2">
                    {media.episodes.map((ep) => (
                      <li
                        key={ep.id}
                        className="rounded bg-white/5 p-3 text-sm"
                      >
                        <p className="font-medium">
                          S{ep.season} E{ep.number}: {ep.title}
                        </p>
                        <p className="text-muted">{ep.synopsis}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {similar.length > 0 && (
                <div>
                  <h3 className="mb-3 font-semibold">More Like This</h3>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {similar.map((item) => (
                      <MediaCard
                        key={item.id}
                        media={item}
                        className="min-w-[200px]"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
