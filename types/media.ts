export type MediaType = "movie" | "series";

export type MediaBadge = "exclusive" | "original" | "top10";

export type MediaAward =
  | "bafta"
  | "certified-fresh"
  | "critics-choice";

export interface Episode {
  id: string;
  season: number;
  number: number;
  title: string;
  runtimeMinutes: number;
  synopsis: string;
}

export interface MediaItem {
  id: string;
  type: MediaType;
  title: string;
  synopsis: string;
  year: number;
  maturity: string;
  matchScore: number;
  genres: string[];
  badges: MediaBadge[];
  awards: MediaAward[];
  formats: string[];
  posterUrl: string;
  backdropUrl: string;
  heroRankLabel?: string;
  seasonCount?: number;
  runtimeMinutes?: number;
  cast: string[];
  creators: string[];
  languages: string[];
  trailerUrl: string;
  playbackUrl: string;
  episodes?: Episode[];
  featured?: boolean;
  categoryTags: string[];
}

export interface ContinueWatchingEntry {
  mediaId: string;
  episodeId?: string;
  progressPercent: number;
  remainingMinutes: number;
  label: string;
}

export type RailVariant = "continue" | "top10" | "standard";

export interface RailDefinition {
  id: string;
  title: string;
  variant: RailVariant;
  itemIds: string[];
  dynamicTitle?: boolean;
}

export interface HomeRailsResponse {
  featuredId: string;
  rails: RailDefinition[];
}

export interface UserMediaState {
  myListIds: string[];
  continueWatching: ContinueWatchingEntry[];
  activeProfile: string;
}

export type BrowseCategory =
  | "tv"
  | "movies"
  | "latest"
  | "original-audio"
  | "search";
