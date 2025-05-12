import React from 'react'
import VideoCarousel from '@/components/videos/videoCarousel'
import { youtubeSources } from '@/constants/videos'

const Home = () => {
  return (
      youtubeSources.map((source) => (
        <VideoCarousel
          key={source.channel}
          ytChannel={source.channel}
          ytVideos={source.videos}
        />
      ))
  )
}

export default Home