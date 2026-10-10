import { BrowsePageClient } from "@/components/browse/BrowsePageClient";
import { Suspense } from "react";

export default function BrowseCategoryPage() {
  return (
    <Suspense
      fallback={
        <div className="px-4 py-12 pt-24 text-muted md:px-10">
          Loading browse...
        </div>
      }
    >
      <BrowsePageClient />
    </Suspense>
  );
}
