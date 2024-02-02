import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import Button from "../button";
import Modal from "../modal";

interface AudioPlayerProps {
  mainTheme: string;
  isMuted: boolean;
  setIsMuted: Dispatch<SetStateAction<boolean>>;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  mainTheme,
  isMuted,
  setIsMuted,
}) => {
  const mainThemeAudioRef = useRef<HTMLAudioElement | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [modal, setModal] = useState<boolean>(true);

  const handleTogglePlayback = () => {
    if (mainThemeAudioRef.current) {
      if (!hasInteracted) {
        setHasInteracted(true);
      }
      mainThemeAudioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  function handleYes() {
    if (mainThemeAudioRef.current) {
      if (!hasInteracted) {
        setHasInteracted(true);
      }
      mainThemeAudioRef.current.muted = false;
      setIsMuted(false);
      setModal(false);
    }
  }

  function handleNo() {
    if (mainThemeAudioRef.current) {
      if (!hasInteracted) {
        setHasInteracted(true);
      }
      mainThemeAudioRef.current.muted = true;
      setIsMuted(true);
      setModal(false);
    }
  }

  const [volume, setVolume] = useState(30);
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(event.target.value);
    setVolume(newVolume);

    if (mainThemeAudioRef.current) {
      mainThemeAudioRef.current.volume = newVolume / 100;
    }
  };

  useEffect(() => {
    if (mainThemeAudioRef.current && hasInteracted) {
      mainThemeAudioRef.current.play();
      mainThemeAudioRef.current.volume = volume/100;
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
      <div style={{ position: "absolute", bottom: "50px", right: "10px" }}>
        <label htmlFor="volumeSlider">Volume:</label>
        <p className="text-white">{isMuted ? "Muted" : "NonMuted"}</p>
        <input
          id="volumeSlider"
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
      <Modal
        size="small"
        title="Do you want audio?"
        showModal={modal}
        onClose={() => setModal(false)}
      >
        <div className="flex justify-center gap-x-4 py-4">
          <Button
            size={"small"}
            onClick={() => {
              handleYes();
            }}
          >
            Yes
          </Button>

          <Button size={"small"} onClick={() => handleNo()}>
            No
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AudioPlayer;
