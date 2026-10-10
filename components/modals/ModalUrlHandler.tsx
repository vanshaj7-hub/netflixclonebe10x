"use client";

import { useMediaModal } from "@/components/modals/MediaModalContext";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function ModalUrlHandler() {
  const searchParams = useSearchParams();
  const modalId = searchParams.get("modal");
  const { openModal } = useMediaModal();

  useEffect(() => {
    if (modalId) {
      openModal(modalId);
    }
  }, [modalId, openModal]);

  return null;
}
