import seedState from "@/data/seed-user-state.json";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ myListIds: seedState.myListIds });
}

export async function PATCH(request: NextRequest) {
  const body = (await request.json()) as {
    mediaId?: string;
    action?: "add" | "remove";
  };
  if (!body.mediaId || !body.action) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  return NextResponse.json({
    ok: true,
    mediaId: body.mediaId,
    action: body.action,
    note: "Persisted on client via Zustand",
  });
}
