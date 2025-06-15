import { MutableRefObject, useEffect, useRef } from "react";

interface Props {
  analyserRef: MutableRefObject<AnalyserNode | null>;
  dataArrayRef: MutableRefObject<Uint8Array | null>;
  barCount?: number;
  height?: number;
}

export default function LiveWaveform({
  analyserRef,
  dataArrayRef,
  barCount = 64,
  height = 64,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !analyserRef.current || !dataArrayRef.current)
      return;

    const draw = () => {
      if (!analyserRef.current || !dataArrayRef.current) return;

      const width = canvas.width;
      const barWidth = width / barCount;
      const dataArray = dataArrayRef.current;

      analyserRef.current.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, width, canvas.height);

      for (let i = 0; i < barCount; i++) {
        const barHeight = (dataArray[i] / 255) * height;
        const x = i * barWidth;

        ctx.fillStyle = `rgba(59, 130, 246, 0.7)`; // Tailwind blue-500 w/opacity
        ctx.fillRect(x, height - barHeight, barWidth - 1, barHeight);
      }

      animationId.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationId.current) cancelAnimationFrame(animationId.current);
    };
  }, [analyserRef, dataArrayRef, barCount, height]);

  return (
    <canvas
      ref={canvasRef}
      width={barCount * 4}
      height={height}
      className="w-full max-w-md bg-gray-200 rounded shadow"
    />
  );
}
