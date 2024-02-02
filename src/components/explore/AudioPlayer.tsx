import React, { useEffect, useRef, useState } from "react";

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
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          padding: "10px",
          backgroundColor: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        {isMuted ? "Unmute" : "Mute"}
      </button>
    </div>
  );
};

export default AudioPlayer;
