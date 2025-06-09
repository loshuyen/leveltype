import { diffWords } from "diff";

export const normalize = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s]|_/g, '')
};

export const getAccuracyByDiff = (input: string, transcript: string): number => {
    const diff = diffWords(normalize(input), normalize(transcript));
    let totalCount = 0;
    let inCorrectCount = 0;
    diff.forEach(part => {
        totalCount += part.count;
        if (part.added || part.removed) {
            inCorrectCount += part.count;
        }
    });
    return Math.round((totalCount - inCorrectCount) / totalCount * 100);
};

type transcriptType = {
    text: string;
    start: number;
    duration: number;
    end: number;
};

export const calculateAverageAccuracy = (inputs: string | null, transcripts: transcriptType[]): number => {
    if (!inputs) return 0;

    const inputMap = JSON.parse(inputs);
    let totalAccuracy = 0;
    let count = 0;

    transcripts.forEach((transcript, index) => {
        const inputText = inputMap[String(index)] || "";
        if (inputText) {
            const accuracy = getAccuracyByDiff(inputText, transcript.text);
            totalAccuracy += accuracy;
            count++;
        }
    });

    return count > 0 ? Math.round(totalAccuracy / count) : 0;
};

export const updateAverageAccuracy = ({ currentCount, currentAccuracy, newAccuracy }: {currentCount: number, currentAccuracy: number, newAccuracy: number}): number => {
    if (currentCount === 0) return newAccuracy;
    return Math.round((currentAccuracy * currentCount + newAccuracy) / (currentCount + 1));
}