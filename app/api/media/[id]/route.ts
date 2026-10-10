import { getMediaById } from "@/lib/media";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const media = getMediaById(id);
  if (!media) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(media);
}
