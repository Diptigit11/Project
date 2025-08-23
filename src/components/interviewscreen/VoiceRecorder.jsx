import React, { useEffect, useRef, useState } from "react";
import { Mic, Square, X } from "lucide-react";

export default function VoiceRecorder({ questionId, initialAudioURL = null, onSave }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(initialAudioURL);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);

  useEffect(() => {
    setIsRecording(false);
    setAudioURL(initialAudioURL || null);
    stopStream();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionId, initialAudioURL]);

  useEffect(() => () => stopStream(), []);

  const stopStream = () => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    } catch {}
  };

  const toggleRecording = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;

        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) audioChunksRef.current.push(e.data);
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
          const url = URL.createObjectURL(blob);
          setAudioURL(url);
          stopStream();
          onSave?.(url);
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Mic access error:", err);
        alert("⚠️ Please allow microphone access.");
      }
    } else {
      try {
        mediaRecorderRef.current?.stop();
      } finally {
        setIsRecording(false);
      }
    }
  };

  const clearRecording = () => {
    setAudioURL(null);
    onSave?.(null);
  };

  return (
    <div className="flex flex-col mt-6 w-full">
      <div className="flex items-center gap-4 w-full">
        {/* Start/Stop Button */}
        <button
          onClick={toggleRecording}
          className={`flex items-center gap-3 px-6 py-3 rounded-full font-semibold shadow-lg transition-all ${
            isRecording
              ? "bg-red-600 text-white animate-pulse"
              : "bg-[#012A4A] text-white hover:bg-[#013A5A]"
          }`}
        >
          {isRecording ? (
            <>
              <Square size={18} />
              Stop
            </>
          ) : (
            <>
              <Mic size={18} />
              Record
            </>
          )}
        </button>

        {/* Preview (next to button) */}
        {audioURL && (
          <div className="flex items-center gap-2 flex-1">
            <audio controls src={audioURL} className="w-full" />
            <button
              onClick={clearRecording}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
              title="Clear Recording"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
