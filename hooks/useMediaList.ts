"use client";

import type { HomeRailsResponse, MediaItem } from "@/types/media";
import { useQuery } from "@tanstack/react-query";

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Request failed");
  return res.json() as Promise<T>;
}

export function useHomeRails() {
  return useQuery({
    queryKey: ["home-rails"],
    queryFn: () =>
      fetchJson<{
        featured: MediaItem;
        rails: { rail: HomeRailsResponse["rails"][0]; items: MediaItem[] }[];
      }>("/api/media?scope=home"),
  });
}

export function useMediaDetail(id: string | null) {
  return useQuery({
    queryKey: ["media", id],
    queryFn: () => fetchJson<MediaItem>(`/api/media/${id}`),
    enabled: Boolean(id),
  });
}

export function useMediaByCategory(category: string, query?: string) {
  const params = new URLSearchParams({ category });
  if (query) params.set("q", query);
  return useQuery({
    queryKey: ["media", category, query ?? ""],
    queryFn: () =>
      fetchJson<{ items: MediaItem[] }>(`/api/media?${params.toString()}`),
  });
}

export function useMediaCatalog() {
  return useQuery({
    queryKey: ["media-catalog"],
    queryFn: () => fetchJson<{ items: MediaItem[] }>("/api/media"),
  });
}
