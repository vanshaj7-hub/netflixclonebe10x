"use client";

import { MediaCard } from "@/components/rails/MediaCard";
import { getMediaById } from "@/lib/media";
import { useUserMediaStore } from "@/stores/userMediaStore";

export function MyListView() {
  const myListIds = useUserMediaStore((s) => s.myListIds);
  const items = myListIds
    .map((id) => getMediaById(id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <div className="px-4 py-8 pt-24 md:px-10">
      <h1 className="mb-6 text-2xl font-bold md:text-3xl">My List</h1>
      {items.length === 0 ? (
        <p className="text-muted">
          Your list is empty. Add titles from any detail view.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {items.map((item) => (
            <MediaCard key={item.id} media={item} className="min-w-0" />
          ))}
        </div>
      )}
    </div>
  );
}
