import React, { useState, useRef } from "react";
import { Mic, Square, X } from "lucide-react";

export default function VoiceRecorder({ onSave }) {
  const [audioURL, setAudioURL] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
        onSave?.(blob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Mic error:", err);
      alert("⚠️ Please allow microphone access & run on localhost/https");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const toggleRecording = () => {
    if (isRecording) stopRecording();
    else startRecording();
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
