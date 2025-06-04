import React, { startTransition } from "react";
import WordDiff from "./diff";
import { Button } from "@/components/ui/button";
import { PlayCircle, PauseCircle, EyeIcon, EyeOffIcon } from "lucide-react";
import { Textarea } from "../ui/textarea";

const Sentence = ({ videoId, email, transcript, index, handlePlayClick, isActive, ref, isPlaying, input, handleUpdateInput, updateInputCount }) => {
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const [inputText, setInputText] = React.useState(input[index] || "");
  const [isVisible, setIsVisible] = React.useState(false);

  const handleInputSubmit = () => {
    startTransition(async () => {
      setInputText(inputRef.current?.value || "")
      await handleUpdateInput(videoId, email, index, inputRef.current?.value || "");
      updateInputCount();
    })
  };

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
        >
          {inputText ? "更新" : "提交"}
        </Button>
      </div>
    </div>
  );
};

export default Sentence;
