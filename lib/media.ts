import catalog from "@/data/media-catalog.json";
import homeRails from "@/data/rails-home.json";
import type {
  BrowseCategory,
  HomeRailsResponse,
  MediaItem,
  RailDefinition,
} from "@/types/media";

const items = catalog.items as MediaItem[];

export function getAllMedia(): MediaItem[] {
  return items;
}

export function getMediaById(id: string): MediaItem | undefined {
  return items.find((item) => item.id === id);
}

export function getFeaturedMedia(): MediaItem {
  const home = homeRails as HomeRailsResponse;
  return getMediaById(home.featuredId) ?? items[0];
}

export function getHomeRailsConfig(): HomeRailsResponse {
  return homeRails as HomeRailsResponse;
}

export function getRailsWithItems(
  rails: RailDefinition[],
  mediaMap: Map<string, MediaItem>,
): { rail: RailDefinition; items: MediaItem[] }[] {
  return rails.map((rail) => ({
    rail,
    items: rail.itemIds
      .map((id) => mediaMap.get(id))
      .filter((item): item is MediaItem => Boolean(item)),
  }));
}

export function filterByCategory(category: BrowseCategory): MediaItem[] {
  if (category === "search") return items;
  if (category === "tv") {
    return items.filter((item) => item.type === "series");
  }
  if (category === "movies") {
    return items.filter((item) => item.type === "movie");
  }
  if (category === "latest") {
    return items.filter((item) => item.categoryTags.includes("latest"));
  }
  if (category === "original-audio") {
    return items.filter((item) =>
      item.categoryTags.includes("original-audio"),
    );
  }
  return items;
}

export function searchMedia(query: string): MediaItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return items.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.genres.some((g) => g.toLowerCase().includes(q)),
  );
}

export function getSimilarMedia(media: MediaItem, limit = 6): MediaItem[] {
  return items
    .filter(
      (item) =>
        item.id !== media.id &&
        item.genres.some((genre) => media.genres.includes(genre)),
    )
    .slice(0, limit);
}

export function getMediaMap(): Map<string, MediaItem> {
  return new Map(items.map((item) => [item.id, item]));
}
