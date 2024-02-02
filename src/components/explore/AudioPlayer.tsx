import React, { useEffect, useRef, useState } from "react";
import { IoVolumeHigh, IoVolumeMute } from "react-icons/io5";

interface AudioPlayerProps {
  mainTheme: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  mainTheme,

}) => {
  const mainThemeAudioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleTogglePlayback = () => {
    if (mainThemeAudioRef.current) {
      if (!hasInteracted) {
        setHasInteracted(true);
      }
      mainThemeAudioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    if (mainThemeAudioRef.current && hasInteracted) {
      mainThemeAudioRef.current.play();
    }
  }, [hasInteracted]);

  return (
    <div style={{ position: "relative" }}>
      <audio ref={mainThemeAudioRef} loop muted={isMuted} autoPlay playsInline>
        <source src={mainTheme} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      <button
        onClick={handleTogglePlayback}
        className="text-white scale-125 hover:scale-150"
        style={{
          position: "absolute",
          bottom: 0,
          right: 20,
          border: "none",
          cursor: "pointer",
        }}
      >
        {isMuted ? <IoVolumeMute size={20} /> : <IoVolumeHigh size={20} />}
      </button>
    </div>
  );
};

export default AudioPlayer;
