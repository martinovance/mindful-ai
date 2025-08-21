import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import MicPro from "@/assets/Images/MicPro.webp";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/shared/Toast";
import { useState } from "react";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import { Loader2 } from "lucide-react";
import { Input } from "./ui/input";
// import WaveformPlayer from "@/shared/WaveformPlayer";
import LiveWaveform from "@/shared/LiveWaveform";
import { saveAudioToFirestore } from "@/services/fireStoreService";
import { useAuth } from "@/hooks/useAuth";

const Voice = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [title, setTitle] = useState("");

  const {
    stopRecording,
    startRecording,
    recording,
    // audioURL,
    analyserRef,
    dataArrayRef,
  } = useVoiceRecorder();

  const { mutate: uploadRecording, isPending } = useMutation({
    mutationFn: async ({ blob, title }: { blob: Blob; title: string }) => {
      const formData = new FormData();
      formData.append("file", blob);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );
      formData.append("folder", "voiceJournals");

      const res = await fetch(import.meta.env.VITE_CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload to Cloudinary failed");
      if (!user?.uid) throw new Error("User not authenticated");

      const data = await res.json();
      const audioUrl = data.secure_url;

      await saveAudioToFirestore({
        userId: user?.uid,
        title,
        audioUrl,
      });

      return {
        audioUrl,
        title,
        createdAt: new Date(),
      };
    },
    onSuccess: () => {
      showToast({
        title: "Uploaded!",
        description: "Recording successfully uploaded.",
        status: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["voiceJournals", user?.uid] });
      queryClient.invalidateQueries({
        queryKey: ["combinedEntries", user?.uid],
      });
    },
    onError: (error: Error) => {
      showToast({
        title: "Error",
        description: error.message,
        status: "error",
      });
    },
  });

  const handleStop = () => {
    stopRecording((finalBlob) => {
      if (!finalBlob || !title) {
        showToast({
          title: "Error",
          description: "Recording blob or title missing.",
          status: "error",
        });
        return;
      }

      uploadRecording({ blob: finalBlob, title });
    });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <Card className="w-full min-h-[159px] md:h-[240px] p-0 bg-[#F5F5F5] shadow-none overflow-hidden">
        <img
          src={MicPro}
          alt="record"
          className="w-full h-full object-cover rounded-xl"
        />
      </Card>
      <Input
        placeholder="Give your recording a title"
        className="input w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {recording && (
        <LiveWaveform
          analyserRef={analyserRef}
          dataArrayRef={dataArrayRef}
          barCount={74}
          height={34}
        />
      )}

      {!recording ? (
        <Button
          onClick={startRecording}
          className="w-full bg-[#0D80F2] rounded-full hover:text-white 
              cursor-pointer"
        >
          Start Recording
        </Button>
      ) : (
        <Button
          onClick={handleStop}
          className="w-full bg-[#0D80F2] rounded-full hover:text-white 
              cursor-pointer"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Stop & save"
          )}
        </Button>
      )}

      {/* {isPending && audioURL && <WaveformPlayer audioURL={audioURL} />} */}
    </div>
  );
};

export default Voice;
