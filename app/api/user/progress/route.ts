import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  const body = (await request.json()) as {
    mediaId?: string;
    progressPercent?: number;
    remainingMinutes?: number;
    label?: string;
    episodeId?: string;
  };

  if (!body.mediaId || body.progressPercent === undefined) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    entry: body,
    note: "Persisted on client via Zustand",
  });
}
