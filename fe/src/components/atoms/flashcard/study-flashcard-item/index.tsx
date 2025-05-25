import "./style.scss";
import { IVocabulary } from "@src/types/interface";
import useAudio from "@src/hooks/useAudio";
import Image from "next/image";
import clsx from "clsx";
import React, { useEffect } from "react";

function StudyFlashcardItem({
  item,
  isFlipped,
  setIsFlipped,
}: {
  item: IVocabulary;
  isFlipped: boolean;
  setIsFlipped: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { speakWithRate, isPlay } = useAudio();

  const handleSpeak = (rate: number = 1) => {
    speakWithRate(item.word, rate);
  };

  const handleFlipped = () => {
    if (!isPlay) {
      setIsFlipped((prev) => !prev);
    }
  };

  useEffect(() => {
    if(!isPlay){
      handleSpeak(1);
    }
  }, [isFlipped])

  return (
    <div
      className={clsx("study-flashcard-item", { flipped: isFlipped })}
      onClick={handleFlipped}
    >
      {/* FRONT */}
      <div className="front flex flex-col items-center text-center gap-2 p-2">
        <Image
          src={item.image}
          alt="img"
          width={96}
          height={96}
          className="w-32 h-32 object-cover rounded"
        />
        <div className="text-xl font-bold">{item.word}</div>
        <div className="text-gray-500 italic">{item.transcription}</div>
        <div className="flex gap-3 mt-2">
          <button
            className="px-2 py-1 bg-blue-100 rounded hover:bg-blue-200"
            onClick={(e) => {
              e.stopPropagation();
              handleSpeak(1);
            }}
          >
            🔊 Đọc
          </button>
          <button
            className="px-2 py-1 bg-green-100 rounded hover:bg-green-200"
            onClick={(e) => {
              e.stopPropagation();
              handleSpeak(0.5);
            }}
          >
            🐢 Chậm
          </button>
        </div>
      </div>

      {/* BACK */}
      <div className="back flex flex-col items-center text-center gap-2 p-2">
        <div className="text-xl font-bold">{item.translate}</div>
        <div className="text-base text-gray-800 whitespace-pre-line">
          {item.description}
        </div>
        <div className="flex gap-3 mt-2">
          <button
            className="px-2 py-1 bg-blue-100 rounded hover:bg-blue-200"
            onClick={(e) => {
              e.stopPropagation();
              handleSpeak(1);
            }}
          >
            🔊 Đọc
          </button>
          <button
            className="px-2 py-1 bg-green-100 rounded hover:bg-green-200"
            onClick={(e) => {
              e.stopPropagation();
              handleSpeak(0.5);
            }}
          >
            🐢 Chậm
          </button>
        </div>
        <Image
          src={item.image}
          alt="img"
          width={96}
          height={96}
          className="w-32 h-32 object-cover rounded mt-3"
        />
      </div>
    </div>
  );
}

export default StudyFlashcardItem;
