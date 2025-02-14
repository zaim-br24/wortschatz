"use client";
import { useState, useEffect } from "react";
import words from "../data/words";

type Colors = {
  noun: string;
  verb: string;
  adjective: string;
  adverb: string;
};

const color: Colors = {
  noun: "text-rose-600",
  verb: "text-green-600",
  adjective: "text-blue-700",
  adverb: "text-purple-700",
};

const Flashcard: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  let touchStartX = 0;
  let touchEndX = 0;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        nextWord();
      } else if (event.code === "ArrowRight") {
        nextWord();
      } else if (event.code === "ArrowLeft") {
        prevWord();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const nextWord = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
  };

  const prevWord = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? words.length - 1 : prevIndex - 1
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      nextWord();
    } else if (touchEndX - touchStartX > 50) {
      prevWord();
    }
  };

  const currentWord = words[currentIndex];

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      {currentWord ? (
        <div
          className="flex flex-col justify-center items-center bg-white shadow-lg rounded-xl sm:p-10 p-7 h-[80%] sm:w-[80%] w-[100%] text-center"
          onDoubleClick={nextWord}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <h2
            className={`text-4xl sm:text-6xl font-extrabold mb-4 ${
              color[currentWord.type]
            }`}
          >
            {currentWord.german}
            <span className="text-base sm:text-lg text-gray-500 italic">
              ({currentWord.translation})
            </span>
            <span className="text-base sm:text-lg text-gray-300 italic">
              {" "}
              {currentWord.type}{" "}
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
        <p className="text-lg sm:text-xl">No more words available!</p>
      )}
    </div>
  );
};

export default Flashcard;
