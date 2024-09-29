import React, { Suspense } from "react";
import StoreClient from "./StoreClient";

export const dynamic = "force-dynamic";

export default function StorePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StoreClient />
    </Suspense>
  );
}

// path: src/app/store/page.tsx
