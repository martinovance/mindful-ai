import { useRef, useState } from "react";

export function useVoiceRecorder() {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const [volume, setVolume] = useState(0);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const [audioDuration, setAudioDuration] = useState<string | null>(null);

  let animationId: number;

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);

    analyserRef.current = audioContext.createAnalyser();
    source.connect(analyserRef.current);
    analyserRef.current.fftSize = 256;

    const bufferLength = analyserRef.current.frequencyBinCount;
    dataArrayRef.current = new Uint8Array(bufferLength);

    const draw = () => {
      if (!analyserRef.current || !dataArrayRef.current) return;
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      const avg =
        dataArrayRef.current.reduce((a, b) => a + b, 0) / bufferLength;
      setVolume(avg);
      animationId = requestAnimationFrame(draw);
    };

    draw();

    mediaRecorder.current = new MediaRecorder(stream);
    mediaRecorder.current.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunks.current.push(e.data);
      }
    };
    mediaRecorder.current.onstop = () => {
      const completeBlob = new Blob(chunks.current, { type: "audio/webm" });
      const url = URL.createObjectURL(completeBlob);
      const audio = new Audio(url);

      audio.onloadedmetadata = () => {
        const duration = audio.duration;
        setAudioDuration(duration.toFixed(2)); // store in state
      };

      setBlob(completeBlob);
      setAudioURL(url);
      cancelAnimationFrame(animationId);
      audioContext.close();
      chunks.current = [];
    };
    mediaRecorder.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.current?.stop();
    setRecording(false);
  };

  return {
    audioDuration,
    recording,
    audioURL,
    blob,
    volume,
    analyserRef,
    dataArrayRef,
    startRecording,
    stopRecording,
  };
}
