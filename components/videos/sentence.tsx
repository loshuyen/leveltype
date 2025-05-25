import React from "react";
import WordDiff from "./diff";
import { Button } from "@/components/ui/button";
import { PlayCircle, PauseCircle, EyeIcon, EyeOffIcon } from "lucide-react";
import { Textarea } from "../ui/textarea";

const Sentence = ({ transcript, index, handlePlayClick, isActive, ref, isPlaying }) => {
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const [inputText, setInputText] = React.useState("");
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <div
      key={index}
      className={`w-full p-3 ${
        isActive ? "dark:bg-gray-800 bg-amber-100" : " hover:bg-amber-100 dark:hover:bg-gray-800"
      }`}
      ref={ref}
    >
      <div className={`flex w-full items-center space-x-2 mb-2 ${inputText ? "hidden" : ""}`}>
        <div className={`space-x-1 text-lg font-bold ml-10 mb-2 mr-auto ${isVisible ? "" : "invisible"}`}>
          {transcript.text}
        </div>
        <Button 
          variant="outline" 
          onClick={() => setIsVisible(!isVisible)}
        >
          {isVisible ? <EyeOffIcon/> : <EyeIcon/>}
        </Button>
      </div>
      <WordDiff text1={inputText} text2={transcript.text} />
      <div className="flex w-full items-center space-x-2">
        <Button variant="ghost" size="icon" onClick={handlePlayClick}>
          {isPlaying && isActive ? <PauseCircle /> : <PlayCircle />}
        </Button>
        <Textarea 
          className="font-semibold overflow-hidden resize-none min-h-0 h-auto" placeholder="Type here..." 
          ref={inputRef}
        />
        <Button
          type="submit"
          onClick={() => setInputText(inputRef.current?.value || "")}
        >
          {inputText ? "更新" : "提交"}
        </Button>
      </div>
    </div>
  );
};

export default Sentence;
