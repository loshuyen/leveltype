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

const VideoCardList = async ({ videos }: { videos: Video[] }) => {
  return (
    <div className="w-full grid gap-4 lg:grid-cols-4">
      {videos.map((video) => (
        <Link
          key={video.id}
          href={`/videos/${video.id}`}
          className="flex flex-row gap-3 py-3 px-2 dark:hover:bg-cyan-950 shadow-sm transition duration-200
                     lg:flex-col lg:bg-gray-900 lg:hover:bg-cyan-950 lg:rounded-xl"
        >
          <div className="relative w-40 aspect-video shrink-0 lg:w-full">
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-md"
            />
          </div>
          <div className="flex flex-col justify-between flex-1 lg:p-2">
            <div className="line-clamp-2 font-semibold text-sm lg:text-base text-white">{video.title}</div>
            <div className="mt-1 text-xs text-gray-400">
              <VideoStatus videoId={video.id} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default VideoCardList;
