import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

const WaveformPlayer = ({ audioURL }: { audioURL: string }) => {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (!audioURL || !waveformRef.current) return;

    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#cbd5e1",
      progressColor: "#3b82f6",
      height: 60,
      barWidth: 3,
      barGap: 1,
      barRadius: 3,
      cursorWidth: 0,
      normalize: true,
      interact: true,
    });

    wavesurfer.current.load(audioURL);

    wavesurfer.current.on("ready", () => {
      setDuration(wavesurfer.current?.getDuration() || 0);
    });

    wavesurfer.current.on("audioprocess", () => {
      setCurrentTime(wavesurfer.current?.getCurrentTime() || 0);
    });

    wavesurfer.current.on("finish", () => setIsPlaying(false));

    return () => {
      wavesurfer.current?.destroy();
    };
  }, [audioURL]);

  const togglePlayback = () => {
    if (!wavesurfer.current) return;
    wavesurfer.current.playPause();
    setIsPlaying(wavesurfer.current.isPlaying());
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60)
      .toString()
      .padStart(2, "0");
    return `${mins}:${seconds}`;
  };

  return (
    <div
      className="bg-white dark:bg-zinc-800 p-4 rounded-full 
    shadow-lg flex items-center spacex-4 max-w-xl w-full"
    >
      <Button
        onClick={togglePlayback}
        className="text-blue-500 bg-transparent size-0 hover:text-blue-700 font-bold text-lg"
      >
        {isPlaying ? "⏸" : "▶️"}
      </Button>
      <span className="ml-1 text-sm text-gray-500">
        {formatTime(currentTime)}
      </span>
      <div ref={waveformRef} className="flex-1 w-full max-w-xl" />
      <span className="ml-1 text-sm text-gray-500">{formatTime(duration)}</span>
    </div>
  );
};

export default WaveformPlayer;
