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

interface Video {
  id: string
  title: string
  link: string
  thumbnail: string
}

export default function VideoCarousel({ ytChannel, ytVideos }: { ytChannel: string, ytVideos: Video[] }) {
  return (
    <>
      <div className="text-2xl font-bold self-start mb-4 ml-10">
        {ytChannel}
      </div>
      <Carousel className="w-[90%] mb-10" 
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-4">
          {ytVideos.map((video) => (
            <CarouselItem key={video.id} className="pl-4 md:basis-1/2 lg:basis-1/4 hover:cursor-pointer group">
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
                  <div className="overflow-hidden h-15 font-semibold m-1 p-2 rounded-b-lg">{video.title}</div>
                </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
)}