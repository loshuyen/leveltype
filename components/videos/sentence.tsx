import React, { startTransition } from "react";
import WordDiff from "./diff";
import { Button } from "@/components/ui/button";
import { PlayCircle, PauseCircle, EyeIcon, EyeOffIcon } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { upsertInputParams } from "@/actions/input";
import { getAccuracyByDiff } from "@/lib/diff";
import { Loader2Icon } from "lucide-react"

type SentenceProps = {
  videoId: string;
  email: string | null;
  transcript: { text: string, start: number; end: number; duration: number };
  index: number;
  handlePlayClick: () => void;
  isActive: boolean;
  ref?: React.Ref<HTMLDivElement>;
  isPlaying: boolean;
  input: string[];
  handleUpdateInput: ({ videoId, email, index, text }: upsertInputParams) => Promise<void>;
  updateInputCount: (newAccuracy: number) => void;
};

const Sentence = ({ videoId, email, transcript, index, handlePlayClick, isActive, ref, isPlaying, input, handleUpdateInput, updateInputCount }: SentenceProps
) => {
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const [inputText, setInputText] = React.useState(input[index] || "");
  const [isVisible, setIsVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleInputSubmit = () => {
    setIsLoading(true);
    startTransition(async () => {
      const text = inputRef.current?.value || "";
      setInputText(text)
      await handleUpdateInput({videoId, email, index, text});
      updateInputCount(getAccuracyByDiff(text, transcript.text));
      setIsLoading(false);
    })
  };

  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

  return (
    <div
      key={index}
      className={`w-full p-3 ${
        isActive ? "dark:bg-gray-800 bg-amber-100" : " hover:bg-amber-100 dark:hover:bg-gray-800"
      }`}
      ref={ref}
    >
      <div className="flex items-start gap-2 mb-2">
        <p className="text-xs mt-[6px]">{formatTime(transcript.start)}</p>
        { inputText ? 
          <WordDiff text1={inputText} text2={transcript.text} /> 
          :
          <>
            <p className={`text-lg font-semibold mr-auto ${isVisible ? "" : "invisible"}`}>
              {transcript.text}
            </p>
            <Button 
              variant="outline" 
              onClick={() => setIsVisible(!isVisible)}
            >
              {isVisible ? <EyeOffIcon/> : <EyeIcon/>}
            </Button>  
          </>
        }
      </div>
      <div className="flex w-full items-center">
        <Button variant="ghost" size="icon" onClick={handlePlayClick}>
          {isPlaying && isActive ? <PauseCircle /> : <PlayCircle />}
        </Button>
        <Textarea 
          className="font-semibold overflow-hidden resize-none min-h-0 h-auto mr-2" placeholder="Type here..." 
          ref={inputRef}
          defaultValue={inputText}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleInputSubmit();
            }
          }}
        />
        <Button
          type="submit"
          onClick={handleInputSubmit}
          disabled={isLoading}
          className=" w-[60px] h-[36px]"
        >
          {isLoading ? <Loader2Icon className="animate-spin" /> : inputText ? "更新" : "提交"}
        </Button>
      </div>
    </div>
  );
};

export default Sentence;
