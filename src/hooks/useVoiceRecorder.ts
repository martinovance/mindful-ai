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
  const streamRef = useRef<MediaStream | null>(null);
  const onRecordingStopRef = useRef<((blob: Blob) => void) | null>(null);

  let animationId: number;

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    streamRef.current = stream;
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);

    analyserRef.current = audioContext.createAnalyser();
    analyserRef.current.fftSize = 256;
    source.connect(analyserRef.current);

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
      console.log("Data available:", e.data);
      if (e.data.size > 0) {
        chunks.current.push(e.data);
      }
    };
    mediaRecorder.current.onstop = () => {
      console.log("onstop fired");
      const completeBlob = new Blob(chunks.current, { type: "audio/webm" });
      const url = URL.createObjectURL(completeBlob);
      const audio = new Audio(url);

      audio.onloadedmetadata = () => {
        setAudioDuration(audio.duration.toFixed(2));
      };

      setBlob(completeBlob);
      setAudioURL(url);

      cancelAnimationFrame(animationId);

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      chunks.current = [];

      if (onRecordingStopRef) {
        console.log("Calling onRecordingStop...");
        onRecordingStopRef.current!(completeBlob);
        onRecordingStopRef.current = null;
      }

      audioContext.close();
    };

    console.log("Starting MediaRecorder...");
    mediaRecorder.current.start();
    console.log("MediaRecorder state:", mediaRecorder.current.state);
    setRecording(true);
  };

  const stopRecording = (callback?: (blob: Blob) => void) => {
    onRecordingStopRef.current = callback || null;
    if (mediaRecorder.current?.state === "recording") {
      console.log("stop() called on MediaRecorder");
      mediaRecorder.current.stop();
      setRecording(false);
    }
  };

  return {
    audioDuration,
    recording,
    audioURL,
    blob,
    setBlob,
    volume,
    analyserRef,
    dataArrayRef,
    startRecording,
    stopRecording,
  };
}
