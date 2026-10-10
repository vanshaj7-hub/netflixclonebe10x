"use client";

import { BrowseView } from "@/components/browse/BrowseView";
import { useParams, useSearchParams } from "next/navigation";

const validCategories = new Set([
  "tv",
  "movies",
  "latest",
  "original-audio",
  "search",
]);

export function BrowsePageClient() {
  const params = useParams<{ category: string }>();
  const searchParams = useSearchParams();
  const category = params.category;
  const query = searchParams.get("q") ?? undefined;

  if (!validCategories.has(category)) {
    return (
      <div className="px-4 py-12 pt-24 md:px-10">
        <h1 className="text-2xl font-bold">Category not found</h1>
      </div>
    );
  }

  return <BrowseView category={category} query={query} />;
}
