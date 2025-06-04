import React from 'react'
import VideoCarousel from '@/components/videos/videoCarousel'
import { youtubeSources } from '@/constants/videos'
import { getInputRecordsByUser } from '@/actions/input'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const videoSources = [];

youtubeSources.forEach(source => {
    source.videos.forEach( video => {
        videoSources.push(video);
    })
});

const UserVideos = async () => {
    const session = await auth();

    if (!session) {
        redirect('/');
    }
  
    const videoIds = await getInputRecordsByUser(session?.user?.email);
    const ytVideos = videoSources.filter(video => videoIds.includes(video.id));
    
    return (
        <VideoCarousel ytChannel="My videos" ytVideos={ytVideos}/>
    )
}

export default UserVideos