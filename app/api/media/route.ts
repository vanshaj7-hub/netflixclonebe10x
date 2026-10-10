import {
  filterByCategory,
  getFeaturedMedia,
  getHomeRailsConfig,
  getAllMedia,
  getMediaMap,
  getRailsWithItems,
  searchMedia,
} from "@/lib/media";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const scope = searchParams.get("scope");
  const category = searchParams.get("category");
  const query = searchParams.get("q");

  if (scope === "home") {
    const config = getHomeRailsConfig();
    const mediaMap = getMediaMap();
    const rails = getRailsWithItems(config.rails, mediaMap);
    return NextResponse.json({
      featured: getFeaturedMedia(),
      rails,
    });
  }

  if (category) {
    if (category === "search") {
      return NextResponse.json({ items: searchMedia(query ?? "") });
    }
    let items = filterByCategory(
      category as "tv" | "movies" | "latest" | "original-audio",
    );
    if (query) {
      items = searchMedia(query).filter((item) =>
        items.some((i) => i.id === item.id),
      );
    }
    return NextResponse.json({ items });
  }

  if (query) {
    return NextResponse.json({ items: searchMedia(query) });
  }

  return NextResponse.json({ items: getAllMedia() });
}
