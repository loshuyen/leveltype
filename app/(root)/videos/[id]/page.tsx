import YoutubePlayer from "@/components/videos/youtubePlayer";
import { transcripts } from "@/constants/transcripts";

export default async function VideoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const transcript = transcripts[id];

  return (
    <YoutubePlayer transcript={transcript} videoId={id}/>
  );
}