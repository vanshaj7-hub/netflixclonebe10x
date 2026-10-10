"use client";

import { MediaCard } from "@/components/rails/MediaCard";
import { useMediaByCategory } from "@/hooks/useMediaList";

const titles: Record<string, string> = {
  tv: "TV Shows",
  movies: "Movies",
  latest: "New & Popular",
  "original-audio": "Browse by Languages",
  search: "Search Results",
};

interface BrowseViewProps {
  category: string;
  query?: string;
}

export function BrowseView({ category, query }: BrowseViewProps) {
  const { data, isLoading, isError } = useMediaByCategory(category, query);

  const heading =
    category === "search" && query
      ? `Results for "${query}"`
      : titles[category] ?? "Browse";

  if (isLoading) {
    return (
      <div className="px-4 py-12 text-muted md:px-10">Loading titles...</div>
    );
  }

  if (isError || !data) {
    return (
      <div className="px-4 py-12 text-primary md:px-10">
        Could not load titles.
      </div>
    );
  }

  return (
    <div className="px-4 py-8 pt-24 md:px-10">
      <h1 className="mb-6 text-2xl font-bold md:text-3xl">{heading}</h1>
      {data.items.length === 0 ? (
        <p className="text-muted">No titles found.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {data.items.map((item) => (
            <MediaCard key={item.id} media={item} className="min-w-0" />
          ))}
        </div>
      )}
    </div>
  );
}
