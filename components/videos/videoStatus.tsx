import { transcripts } from "@/constants/transcripts";
import { getInput } from '@/actions/input';
import { auth } from '@/auth';
import React from 'react'
import { calculateAverageAccuracy } from "@/lib/diff";

const VideoStatus = async ({ videoId }:{ videoId: string}) => {
    const session = await auth();
    const email = session?.user?.email || "";
    const input = await getInput({videoId, email})
    const inputCount = input ? Object.values(JSON.parse(input)).filter(value => value !== "").length : 0;
    const transcript = transcripts[videoId as keyof typeof transcripts];

    return (
    <div className="flex justify-start gap-2 text-sm text-white lg:mt-3">
      <div className="bg-fuchsia-800 rounded-sm px-1 py-0.5">
        練習進度({inputCount}/{transcript.length})
      </div>
      <div className="bg-sky-800 rounded-sm px-1 py-0.5">
        正確率{calculateAverageAccuracy(input, transcript)}%
      </div>
    </div>
  )
}

export default VideoStatus