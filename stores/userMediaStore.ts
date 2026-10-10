"use client";

import seedState from "@/data/seed-user-state.json";
import type { ContinueWatchingEntry, UserMediaState } from "@/types/media";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserMediaStore extends UserMediaState {
  toggleMyList: (mediaId: string) => void;
  isInMyList: (mediaId: string) => boolean;
  updateProgress: (entry: ContinueWatchingEntry) => void;
  removeFromContinue: (mediaId: string) => void;
  setActiveProfile: (name: string) => void;
  hydrateFromSeed: () => void;
}

const seed = seedState as UserMediaState;

export const useUserMediaStore = create<UserMediaStore>()(
  persist(
    (set, get) => ({
      myListIds: seed.myListIds,
      continueWatching: seed.continueWatching,
      activeProfile: seed.activeProfile,
      toggleMyList: (mediaId) =>
        set((state) => ({
          myListIds: state.myListIds.includes(mediaId)
            ? state.myListIds.filter((id) => id !== mediaId)
            : [...state.myListIds, mediaId],
        })),
      isInMyList: (mediaId) => get().myListIds.includes(mediaId),
      updateProgress: (entry) =>
        set((state) => {
          const existing = state.continueWatching.filter(
            (e) => e.mediaId !== entry.mediaId,
          );
          return {
            continueWatching: [entry, ...existing],
          };
        }),
      removeFromContinue: (mediaId) =>
        set((state) => ({
          continueWatching: state.continueWatching.filter(
            (e) => e.mediaId !== mediaId,
          ),
        })),
      setActiveProfile: (name) => set({ activeProfile: name }),
      hydrateFromSeed: () =>
        set({
          myListIds: seed.myListIds,
          continueWatching: seed.continueWatching,
          activeProfile: seed.activeProfile,
        }),
    }),
    { name: "cinestream-user-media" },
  ),
);
