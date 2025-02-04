"use client";
import { useState, useEffect } from "react";
import words from "../data/words";

type Word = {
  german: string;
  meaning: string;
  translation: string;
  example1: string;
  example2: string;
  sentenceTranslation1: string;
  sentenceTranslation2: string;
  type: "noun" | "verb" | "adjective" | "adverb";
};
type Colors = {
  noun: string;
  verb: string;
  adjective: string;
  adverb: string;
};

const color: Colors[] = [
  {
    noun: "text-rose-600",
    verb: "text-green-600",
    adjective: "text-blue-700",
    adverb: "text-purple-700",
  },
];
const Flashcard: React.FC = () => {
  const [currentWord, setCurrentWord] = useState<Word | null>(null);

  useEffect(() => {
    loadNewWord();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault(); // Prevent page scrolling on space press
        loadNewWord();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const loadNewWord = () => {
    if (words.length === 0) {
      setCurrentWord(null);
      return;
    }

    const randomIndex = Math.floor(Math.random() * words.length);
    const selectedWord = words[randomIndex];

    setCurrentWord(selectedWord);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 ">
      {currentWord ? (
        <div
          className="flex flex-col justify-center items-center bg-white shadow-lg rounded-xl sm:p-10 p-7 h-[80%] sm:w-[80%] w-[100%] text-center "
          onDoubleClick={loadNewWord}
        >
          <h2
            className={`text-4xl sm:text-6xl font-extrabold mb-4 ${
              color[0][currentWord.type]
            }`}
          >
            {currentWord.german}
            <span className="text-base sm:text-lg text-gray-500 italic">
              ({`${currentWord.translation}`})
            </span>
            <span className="text-base sm:text-lg text-gray-300 italic">
              {" "}
              {`${currentWord.type}`}{" "}
            </span>
          </h2>
          <p className="mb-2 text-gray-400 italic text-sm sm:text-base">
            {currentWord.meaning}
          </p>
          <p className="text-lg sm:text-xl mt-2 text-gray-600 italic font-bold">
            {currentWord.example1}
          </p>
          <p className="text-sm sm:text-md text-gray-300 italic font-medium">
            ({currentWord.sentenceTranslation1})
          </p>
          <p className="text-lg sm:text-xl mt-2 text-gray-600 italic font-semibold">
            {currentWord.example2}
          </p>
          <p className="text-sm sm:text-md text-gray-300 italic font-medium">
            ({currentWord.sentenceTranslation2})
          </p>
        </div>
      ) : (
        <p className="text-lg sm:text-xl">No more words for today!</p>
      )}
    </div>
  );
};

export default Flashcard;
