"use client";

import React, { useEffect, startTransition } from "react";
import YouTube, { YouTubeProps, YouTubePlayer } from "react-youtube";
import Sentence from "@/components/videos/sentence";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress"
import { Play, SkipForward, SkipBack, Pause } from "lucide-react";
import { upsertInputParams, getInputParams } from "@/actions/input";
import { calculateAverageAccuracy } from "@/lib/diff";

type youtubePlayerProps = {
  transcript: {
    start: number;
    end: number;
    text: string;
    duration: number;
  }[];
  videoId: string;
  input: string | null;
  upsertInput: ({ videoId, email, index, text }: upsertInputParams) => Promise<void>;
  email: string | null;
  getInput: ({ videoId, email }: getInputParams) => Promise<string>;
};

const YoutubePlayer = ({ transcript, videoId, input, upsertInput, email, getInput }: youtubePlayerProps) => {
  const playerRef = React.useRef<YouTubePlayer | null>(null);
  const loopingRef = React.useRef<boolean>(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const sentenceRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const [activeTranscriptIndex, setActiveTranscriptIndex] = React.useState<
    number | null
  >(null);
  const [isLooping, setIsLooping] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [inputCount, setInputCount] = React.useState(input ? Object.values(JSON.parse(input)).filter(value => value !== "").length : 0);
  const [averageAccuracyState, setAverageAccuracyState] = React.useState(calculateAverageAccuracy(input, transcript));

  const updateInputCount = () => {
    startTransition(async () => {
      const input = await getInput({videoId, email});
      const averageAccuracy = calculateAverageAccuracy(input, transcript);
      const count = input ? Object.values(JSON.parse(input)).filter(value => value !== "").length : 0
      setAverageAccuracyState(averageAccuracy);
      setInputCount(count);
    })
  };

  useEffect(() => {
    loopingRef.current = isLooping;
  }, [isLooping]);

  useEffect(() => {
    if (!containerRef.current || activeTranscriptIndex === null) return;

    const container = containerRef.current;
    const activeElement = sentenceRefs.current[activeTranscriptIndex];

    if (activeElement) {
      container.scrollTo({
        top: activeElement.offsetTop - container.offsetTop,
        behavior: "smooth",
      });
    }
  }, [activeTranscriptIndex, isPlaying]);

  const onStateChange: YouTubeProps["onStateChange"] = (event) => {
    if (event.data === 1) {
      setIsPlaying(true);
      monitorTime();
    } else {
      setIsPlaying(false);
    }
  };

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    playerRef.current = event.target;
  };

  const opts: YouTubeProps["opts"] = {
    playerVars: {
      autoplay: 0,
      controls: 0,
      rel: 0,
    },
  };

  const monitorTime = () => {
    if (!playerRef.current) return;

    const checkTime = () => {
      if (!playerRef.current) return;

      const currentTime = playerRef.current.getCurrentTime();
      const currentTranscriptIndex = transcript.findIndex(
        (t) => currentTime >= t.start && currentTime < t.end
      );

      if (currentTranscriptIndex !== -1) {
        setActiveTranscriptIndex(currentTranscriptIndex);

        if (
          loopingRef.current &&
          Math.abs(currentTime - transcript[currentTranscriptIndex].end) < 0.1
        ) {
          playerRef.current.seekTo(transcript[currentTranscriptIndex].start);
        }
      } else {
        setActiveTranscriptIndex(null);
      }

      if (playerRef.current.getPlayerState() === 1) {
        requestAnimationFrame(checkTime);
      }
    };

    requestAnimationFrame(checkTime);
  };

  const playSegment = (TranscriptIndex: number) => {
    if (!playerRef.current) return;
    playerRef.current.seekTo(transcript[TranscriptIndex].start);
  };

  const togglePlayPause = () => {
    if (!playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      if (activeTranscriptIndex){
        playerRef.current.seekTo(transcript[activeTranscriptIndex].start);
      }
      playerRef.current.playVideo();
    }
  };

  const handlePlayForward = () => {
    if (
      activeTranscriptIndex === null ||
      activeTranscriptIndex === transcript.length - 1
    ) {
      if (!isPlaying){setActiveTranscriptIndex(0);}
      playSegment(0);
    } else {
      if (!isPlaying){setActiveTranscriptIndex(activeTranscriptIndex + 1);}
      playSegment(activeTranscriptIndex + 1);
    }
  };

  const handlePlayBackward = () => {
    if (activeTranscriptIndex === null || activeTranscriptIndex === 0) {
      if (!isPlaying){setActiveTranscriptIndex(0);}
      playSegment(0);
    } else {
      if (!isPlaying){setActiveTranscriptIndex(activeTranscriptIndex - 1);}
      playSegment(activeTranscriptIndex - 1);
    }
  };

  const changePlaybackRate = (rate: string) => {
    if (playerRef.current) {
      playerRef.current.setPlaybackRate(Number(rate));
    }
  };

  return (
    <div className="w-full h-[calc(100vh-60px)] lg:h-full flex flex-col lg:flex-row gap-4">
      <div className="sticky top-[60px] dark:bg-black bg-white w-full lg:w-[50%]">
        <div className="w-full aspect-video">
          <YouTube
            videoId={videoId}
            opts={opts}
            onReady={onPlayerReady}
            iframeClassName="w-full h-full"
            className="w-full h-full"
            onStateChange={onStateChange}
          />
        </div>
        <div className="w-full h-15 flex p-2">
          <div className="flex flex-1 items-center">
            <div className="flex items-center space-x-2">
              <Switch
                id="looping-mode"
                checked={isLooping}
                onCheckedChange={setIsLooping}
              />
              <Label htmlFor="looping-mode">單句重複播放</Label>
            </div>
          </div>
          <div className="flex flex-1 justify-center items-center gap-5">
            <Button
              variant="ghost"
              className="rounded-full"
              size="icon"
              onClick={handlePlayBackward}
            >
              <SkipBack fill="current" />
            </Button>
            <Button
              variant="ghost"
              className="rounded-full"
              size="icon"
              onClick={togglePlayPause}
            >
              {isPlaying ? <Pause fill="current" /> : <Play fill="current" />}
            </Button>
            <Button
              variant="ghost"
              className="rounded-full"
              size="icon"
              onClick={handlePlayForward}
            >
              <SkipForward fill="current" />
            </Button>
          </div>
          <div className="flex-1 flex justify-end items-center font-semibold">
            <Select onValueChange={changePlaybackRate} defaultValue="1">
              <SelectTrigger className="w-min">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent className="font-semibold">
                <SelectItem value="0.25">0.25x</SelectItem>
                <SelectItem value="0.5">0.5x</SelectItem>
                <SelectItem value="0.75">0.75x</SelectItem>
                <SelectItem value="1">1x</SelectItem>
                <SelectItem value="1.25">1.25x</SelectItem>
                <SelectItem value="1.5">1.5x</SelectItem>
                <SelectItem value="2">2x</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className=" w-full h-5 flex justify-between font-semibold text-sm px-2">
          <div className="flex justify-start items-center">
            練習進度 {`(${inputCount} / ${transcript.length})`}<Progress value={inputCount / transcript.length * 100} className="w-[60px] ml-3"/>
          </div>
          <div>正確率 {averageAccuracyState}%</div>
        </div>
      </div>
      <div
        className="w-full lg:w-[50%] flex-1 min-h-0 lg:h-[420px] overflow-auto divide-y divide-gray-300 border-gray-300 border-[1px]"
        ref={containerRef}
      >
        {transcript.map((t, index) => (
          <Sentence
            videoId={videoId}
            email={email}
            transcript={t}
            key={index}
            index={index}
            handlePlayClick={() => {
              playSegment(index);
            }}
            isActive={activeTranscriptIndex === index}
            ref={(node) => {
              sentenceRefs.current[index] = node;
            }}
            isPlaying={isPlaying}
            input={input ? JSON.parse(input) : ""}
            handleUpdateInput={upsertInput}
            updateInputCount={updateInputCount}
            handleSentenceClick={
              () => {
              if (activeTranscriptIndex === index) return; 
              if (!isPlaying){setActiveTranscriptIndex(index);}
              playSegment(index);
            }
            }
          />
        ))}
      </div>
    </div>
  );
};

export default YoutubePlayer;
