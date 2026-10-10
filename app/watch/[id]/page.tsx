import { WatchPlayer } from "@/components/watch/WatchPlayer";

export default async function WatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <WatchPlayer mediaId={id} />;
}
