import { useState, useRef } from "react";

const useAudio = () => {
  const [isPlay, setIsPlay] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = (text: string) => {
    if (!text) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";

    utterance.onstart = () => setIsPlay(true);
    utterance.onend = () => setIsPlay(false);
    utterance.onerror = () => setIsPlay(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const speakWithRate = (text: string, rate: number) => {
    if (!text) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = rate;

    utterance.onstart = () => setIsPlay(true);
    utterance.onend = () => setIsPlay(false);
    utterance.onerror = () => setIsPlay(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsPlay(false);
  };

  return {
    isPlay,
    speak,
    speakWithRate,
    stop,
  };
};

export default useAudio;
