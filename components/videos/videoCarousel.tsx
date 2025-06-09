import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import Link from "next/link"

interface Video {
  id: string
  title: string
  link: string
  thumbnail: string
}

export default function VideoCarousel({ ytChannel, ytVideos }: { ytChannel: string, ytVideos: Video[] }) {
  return (
    <>
      <div className="text-lg sm:text-xl font-bold self-start mb-1 sm:mb-2 sm:ml-11">
        {ytChannel}
      </div>
      <Carousel className="w-full sm:w-[90%] mb-3 sm:mb-6" 
        opts={{
          align: "start",
          loop: false,
          dragFree: true,
        }}
      >
        <CarouselContent className="-ml-4">
          {ytVideos.map((video) => (
            <CarouselItem key={video.id} className="pl-4 basis-3/4 sm:basis-1/2 lg:basis-1/4 hover:cursor-pointer group">
                <Link href={`/videos/${video.id}`} className="block">
                  <Card className="p-0 gap-0 border-2 dark:group-hover:border-yellow-400 group-hover:border-blue-500 transition-colors duration-200 rounded-lg">
                    <CardContent className="flex aspect-video items-center justify-center p-0 relative">
                      <Image 
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className="object-cover top-0 rounded-t-lg"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                      />
                    </CardContent>
                    <div className="overflow-hidden text-sm h-12 sm:h-15 font-semibold sm:m-1 p-1 sm:p-2 rounded-b-lg my-2 mx-1">{video.title}</div>
                  </Card>
                </Link>  
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex"/>
        <CarouselNext className="hidden sm:flex"/>
      </Carousel>
    </>
)}