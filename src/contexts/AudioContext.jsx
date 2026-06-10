import { createContext, useContext, useEffect, useRef, useState } from "react";

const AudioContext = createContext(null);
const MUSIC_STORAGE_KEY = "caro_music_enabled";
const BACKGROUND_MUSIC_SRC = "/mp3/stadew-ost.mp3";

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [musicEnabled, setMusicEnabled] = useState(() => {
    return localStorage.getItem(MUSIC_STORAGE_KEY) === "true";
  });

  useEffect(() => {
    const audio = new Audio(BACKGROUND_MUSIC_SRC);
    audio.loop = true;
    audio.volume = 0.25;
    audioRef.current = audio;

    if (musicEnabled) {
      audio.play().catch((error) => {
        localStorage.setItem(MUSIC_STORAGE_KEY, "false");
        setMusicEnabled(false);
        console.error("Background music autoplay blocked:", error.message);
      });
    }

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const playMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await audio.play();
      localStorage.setItem(MUSIC_STORAGE_KEY, "true");
      setMusicEnabled(true);
    } catch (error) {
      localStorage.setItem(MUSIC_STORAGE_KEY, "false");
      setMusicEnabled(false);
      console.error("Background music play failed:", error.message);
    }
  };

  const stopMusic = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    localStorage.setItem(MUSIC_STORAGE_KEY, "false");
    setMusicEnabled(false);
  };

  const toggleMusic = () => {
    if (musicEnabled) {
      stopMusic();
      return;
    }

    playMusic();
  };

  return (
    <AudioContext.Provider value={{ musicEnabled, toggleMusic }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);

  if (!context) {
    throw new Error("useAudio must be used within AudioProvider");
  }

  return context;
};
