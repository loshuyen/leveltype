import YoutubePlayer from "@/components/videos/youtubePlayer";
import { transcripts } from "@/constants/transcripts";
import { auth } from "@/auth";
import { getInput, upsertInput } from "@/actions/input";

export default async function VideoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  const transcript = transcripts[id as keyof typeof transcripts];
  const input = await getInput({videoId: id, email: session?.user?.email ?? ""});

  return (
    <YoutubePlayer 
      email={session?.user?.email ?? ""}
      transcript={transcript} 
      videoId={id} 
      input={input}
      upsertInput={upsertInput}
      getInput={getInput}
    />
  );
}