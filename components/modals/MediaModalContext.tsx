"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

interface MediaModalContextValue {
  mediaId: string | null;
  openModal: (id: string) => void;
  closeModal: () => void;
}

const MediaModalContext = createContext<MediaModalContextValue | null>(null);

export function MediaModalProvider({ children }: { children: React.ReactNode }) {
  const [mediaId, setMediaId] = useState<string | null>(null);

  const openModal = useCallback((id: string) => setMediaId(id), []);
  const closeModal = useCallback(() => setMediaId(null), []);

  const value = useMemo(
    () => ({ mediaId, openModal, closeModal }),
    [mediaId, openModal, closeModal],
  );

  return (
    <MediaModalContext.Provider value={value}>
      {children}
    </MediaModalContext.Provider>
  );
}

export function useMediaModal() {
  const ctx = useContext(MediaModalContext);
  if (!ctx) {
    throw new Error("useMediaModal must be used within MediaModalProvider");
  }
  return ctx;
}
