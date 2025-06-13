import Image from "next/image"
import React from "react"
import Link from "next/link"
import VideoStatus from "./videoStatus";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  link: string
}

const VideoCardList = async ({ videos }:{ videos: Video[] }) => {
  return (
    <div className="w-full">
      {videos.map((video) => (
        <Link key={video.id} href={`/videos/${video.id}`} className="flex py-4 px-2 dark:hover:bg-cyan-950">
          <div className="relative w-[40%] aspect-video">
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-md"
            />
          </div>
          <div className="flex-1 px-2 flex flex-col justify-between">
            <div className="line-clamp-2 font-semibold">{video.title}</div>
            <VideoStatus videoId={video.id} />
          </div>
        </Link>
      ))}
    </div>
  )
}

export default VideoCardList