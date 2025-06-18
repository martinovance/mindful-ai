import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import VoiceImg from "@/assets/VoiceImg.svg";
import Recorder from "@/assets/Recorder.svg";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/shared/Toast";
import { useState } from "react";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import { Loader2 } from "lucide-react";
import { Input } from "./ui/input";
import WaveformPlayer from "@/shared/WaveformPlayer";
import LiveWaveform from "@/shared/LiveWaveform";
import {
  fetchVoiceJournals,
  saveAudioToFirestore,
} from "@/services/fireStoreService";
import { useAuth } from "@/hooks/useAuth";
import WaveJournalPlayer from "@/shared/JournalPlayer";

const Voice = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [title, setTitle] = useState("");

  const {
    stopRecording,
    startRecording,
    recording,
    audioURL,
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
      queryClient.invalidateQueries({
        queryKey: ["voiceJournals", user?.uid],
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

  const { data: voiceJournals = [] /* isPending: LoadingJournals */ } =
    useQuery({
      queryKey: ["voiceJournals", user?.uid],
      queryFn: () => {
        if (!user?.uid) throw new Error("User not authenticated");
        const data = fetchVoiceJournals(user?.uid);
        return data ?? [];
      },
      enabled: !!user?.uid,
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
    <div className="p-0 md:p-8 flex flex-col justify-center items-center gap-5">
      <p className="text-2xl font-bold">Record Your Thoughts</p>
      <p className="text-sm text-[#121417] font-small">
        Capture your reflections and insights in your personal voice journal.
      </p>
      <Card className="w-full lg:w-[850px] max-h-[619px] p-0 overflow-hidden">
        <img
          src={VoiceImg}
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
          className="bg-[#B2C9E5] text-[#121417] rounded-full hover:text-white 
              cursor-pointer"
        >
          Start Recording
        </Button>
      ) : (
        <Button
          onClick={handleStop}
          className="bg-[#B2C9E5] text-[#121417] rounded-full hover:text-white 
              cursor-pointer"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Stop & save"
          )}
        </Button>
      )}

      {/* Playback */}
      {isPending && audioURL && <WaveformPlayer audioURL={audioURL} />}

      <div className="flex flex-col justify-center w-full lg:w-[850px] items-start gap-5">
        <p className="text-lg font-medium">Recent Recordings</p>
        <div className="flex flex-col justify-start items-start w-full min-h-[80px] gap-4">
          {voiceJournals?.map((record, i) => (
            <div
              key={i}
              className="flex flex-row justify-between items-center w-full min-h-[80px] gap-3"
            >
              <div className="flex flex-row gap-3 items-center w-full min-h-[80px]">
                <div className="flex justify-center items-center w-[80px] min-h-[80px] bg-[#F0F2F5] rounded-8">
                  <img src={Recorder} alt="recorder" className="h-10 w-10" />
                </div>

                <div className="flex flex-col justify-between items-start gap-2 h-full w-full">
                  <p className="text-sm font-medium">{record.title}</p>
                  <WaveJournalPlayer audioURL={record.audioUrl} />
                  <p className="text-sm font-normal text-[#637387]">
                    {new Date(record.createdAt.seconds * 1000).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-start items-start w-full gap-4 mt-4">
          <p className="text-lg font-medium">Tips for Effective Journaling</p>
          <p className="text-sm font-medium">
            1. Find a quiet space where you can speak freely.
          </p>
          <p className="text-sm font-medium">
            2. Set a timer to keep your recordings concise.
          </p>
          <p className="text-sm font-medium">
            3. Focus on one topic or question per entry.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Voice;
