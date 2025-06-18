// WaveformPlayer.tsx
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

interface Props {
  audioURL: string;
}

const WaveJournalPlayer = ({ audioURL }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    wavesurferRef.current = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#B0BEC5",
      progressColor: "#3B82F6",
      height: 15,
      barWidth: 2,
      barGap: 2,
      barRadius: 2,
      cursorWidth: 0,
      normalize: true,
      interact: true,
    });
    wavesurferRef.current.load(audioURL);

    wavesurferRef.current.on("ready", () => setIsReady(true));
    wavesurferRef.current.on("finish", () => setIsPlaying(false));

    return () => {
      wavesurferRef.current?.destroy();
    };
  }, [audioURL]);

  const togglePlay = () => {
    if (!wavesurferRef.current) return;
    wavesurferRef.current.playPause();
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className="flex flex-row items-center gap-3 w-full">
      <div ref={containerRef} className="flex-1 h-full w-full" />
      <button onClick={togglePlay} className="w-6 h-6" disabled={!isReady}>
        {isPlaying ? <Pause /> : <Play />}
      </button>
    </div>
  );
};

export default WaveJournalPlayer;
