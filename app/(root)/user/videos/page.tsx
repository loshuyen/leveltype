import React from 'react'
import { youtubeSources } from '@/constants/videos'
import { getInputVideoIds } from '@/actions/input'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import VideoCardList from '@/components/videos/videoCardList'

type ytVideo = {
    id: string;
    title: string;
    link: string;
    thumbnail: string;
}

const videoSources: ytVideo[] = [];

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
  
    const videoIds = await getInputVideoIds(session?.user?.email || '');
    const videos = videoSources.filter(video => videoIds?.includes(video.id));
    
    return (
        <VideoCardList videos={videos}/>
    )
}

export default UserVideos