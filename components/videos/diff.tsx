import { diffWords } from "diff";

interface WordDiffProps {
  text1: string;
  text2: string;
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace("‘", "'")
    .replace("’", "'")
}

export default function WordDiff({ text1, text2 }: WordDiffProps) {

  text1 = normalize(text1);
  text2 = normalize(text2);

  const diff = diffWords(text1, text2);

  return (
    <div className="flex flex-wrap text-lg font-bold">  
    {diff.map((part, index) => (
        <span
          key={index}
          className={`${
            part.added && /^[\p{P}]/u.test(part.value) ? "text-pink-500"
            : part.removed && /^[\p{P}]/u.test(part.value) ? "text-red-200 line-through"
            : part.added ? "text-pink-500 ml-2"
            : part.removed ? "text-red-200 line-through ml-2"
            : "text-blue-800 dark:text-sky-400 ml-2"
          }`}
        >
          {part.value}
        </span>
      ))}
    </div>
  );
}
