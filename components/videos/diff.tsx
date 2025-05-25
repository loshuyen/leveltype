import { diffWords } from "diff";

interface WordDiffProps {
  text1: string;
  text2: string;
}

function capitalizeFirstLetter(text: string) {
  if (text.length === 0) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default function WordDiff({ text1, text2 }: WordDiffProps) {
  text2 = text2.replace("’", "'");
  text1 = capitalizeFirstLetter(text1);

  const diff = diffWords(text1, text2);

  if (text1 === "") {
    return diff.map((part, index) => (
      <div key={index} className="space-x-1 flex flex-wrap text-lg"></div>
    ));
  } else {
    return (
      <div className="space-x-1 flex flex-wrap text-lg font-bold ml-10 mb-2">
        {diff.map((part, index) => (
          <span
            key={index}
            className={`px-1 rounded ${
              part.added
                ? "bg-red-200 text-red-800"
                : part.removed
                ? "bg-red-200 text-red-800 line-through"
                : "text-blue-800 dark:text-sky-400"
            }`}
          >
            {part.value}
          </span>
        ))}
      </div>
    );
  }
}
