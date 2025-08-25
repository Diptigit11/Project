import React, { useState, useEffect, useRef } from "react";
import { Mic, Volume2, FileText, RotateCcw } from "lucide-react";

export default function VoiceRecorder({ questionId, initialAudioURL, onSave }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(initialAudioURL);
  const [transcript, setTranscript] = useState("");
  const [showAudio, setShowAudio] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [audioLevels, setAudioLevels] = useState([]);
  const [error, setError] = useState("");

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const recognitionRef = useRef(null);
  const finalTranscriptRef = useRef("");
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const micStreamRef = useRef(null);
  const animationRef = useRef(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = finalTranscriptRef.current;

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript + ' ';
          } else {
            interimTranscript += result[0].transcript;
          }
        }

        finalTranscriptRef.current = finalTranscript;
        setTranscript(finalTranscript + interimTranscript);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      stopRecording();
    };
  }, []);

  // Audio level visualization
  const startAudioVisualization = async (stream) => {
    try {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      
      const microphone = audioContextRef.current.createMediaStreamSource(stream);
      microphone.connect(analyserRef.current);
      
      analyserRef.current.fftSize = 256;
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      
      const updateLevels = () => {
        if (!isRecording) return;
        
        analyserRef.current.getByteFrequencyData(dataArray);
        
        // Create 8 frequency bands for visualization
        const bands = 8;
        const bandWidth = Math.floor(dataArray.length / bands);
        const levels = [];
        
        for (let i = 0; i < bands; i++) {
          let sum = 0;
          for (let j = i * bandWidth; j < (i + 1) * bandWidth; j++) {
            sum += dataArray[j];
          }
          const average = sum / bandWidth;
          levels.push(Math.round((average / 255) * 100));
        }
        
        setAudioLevels(levels);
        animationRef.current = requestAnimationFrame(updateLevels);
      };
      
      updateLevels();
    } catch (err) {
      console.error('Audio visualization error:', err);
    }
  };

  const startRecording = async () => {
    try {
      setError("");
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      
      micStreamRef.current = stream;

      // Start audio recording
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
      };

      // Start speech recognition
      if (recognitionRef.current) {
        finalTranscriptRef.current = "";
        setTranscript("");
        recognitionRef.current.start();
      }

      // Start visualization
      startAudioVisualization(stream);

      mediaRecorder.start();
      setIsRecording(true);

    } catch (err) {
      setError("Microphone access denied. Please allow microphone permissions.");
      console.error("Recording error:", err);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    setAudioLevels([]);

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(track => track.stop());
      micStreamRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    // Save the final transcript
    const finalText = finalTranscriptRef.current.trim();
    if (finalText && onSave) {
      const audioData = {
        transcript: finalText,
        timestamp: new Date().toISOString()
      };
      onSave(JSON.stringify(audioData));
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      // Reset previous content when starting new recording
      setShowAudio(false);
      setShowTranscript(false);
      setAudioURL(null);
      setTranscript("");
      startRecording();
    }
  };

  return (
    <div className="mt-4 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 border border-slate-200 shadow-sm">
      <h3 className="font-semibold text-slate-800 mb-6 flex items-center gap-2">
        <Mic size={20} className="text-blue-600" />
        Voice Recording
      </h3>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Main Recording Button */}
      <div className="flex flex-col items-center mb-6">
        <button
          onClick={toggleRecording}
          className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
            isRecording
              ? "bg-red-500 hover:bg-red-600 animate-pulse"
              : "bg-blue-600 hover:bg-blue-700 hover:scale-105"
          }`}
        >
          {isRecording ? (
            <div className="w-6 h-6 bg-white rounded-sm"></div>
          ) : (
            <Mic size={28} className="text-white ml-1" />
          )}
          
          {/* Recording indicator ring */}
          {isRecording && (
            <div className="absolute -inset-2 border-2 border-red-300 rounded-full animate-ping"></div>
          )}
        </button>

        <p className="text-slate-600 text-sm mt-3 font-medium">
          {isRecording ? "Recording... Click to stop" : "Click to start recording"}
        </p>
      </div>

      {/* Audio Waveform Visualization */}
      {isRecording && (
        <div className="bg-white rounded-lg p-4 mb-6 border border-slate-200">
          <div className="flex items-center justify-center space-x-1 h-16">
            {Array.from({ length: 8 }).map((_, i) => {
              const level = audioLevels[i] || 0;
              const height = Math.max(4, (level / 100) * 60);
              return (
                <div
                  key={i}
                  className="bg-gradient-to-t from-blue-400 to-blue-600 rounded-full transition-all duration-150"
                  style={{
                    width: '6px',
                    height: `${height}px`,
                    opacity: level > 5 ? 1 : 0.3
                  }}
                />
              );
            })}
          </div>
          <p className="text-center text-slate-500 text-xs mt-2">
            {audioLevels.some(level => level > 20) ? "🎤 Voice detected" : "🔇 Speak into microphone"}
          </p>
        </div>
      )}

      {/* Action Buttons (shown after recording) */}
      {!isRecording && (audioURL || transcript.trim()) && (
        <div className="space-y-3">
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                setShowAudio(!showAudio);
                setShowTranscript(false);
              }}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                showAudio
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-blue-600 border border-blue-200 hover:bg-blue-50"
              }`}
            >
              <Volume2 size={18} />
              {showAudio ? "Hide Audio" : "Play Audio"}
            </button>

            <button
              onClick={() => {
                setShowTranscript(!showTranscript);
                setShowAudio(false);
              }}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                showTranscript
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-white text-green-600 border border-green-200 hover:bg-green-50"
              }`}
            >
              <FileText size={18} />
              {showTranscript ? "Hide Text" : "View Text"}
            </button>

            <button
              onClick={toggleRecording}
              className="flex items-center gap-2 px-4 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 font-medium transition-colors"
            >
              <RotateCcw size={18} />
              Re-record
            </button>
          </div>

          {/* Audio Player */}
          {showAudio && audioURL && (
            <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Volume2 size={16} className="text-blue-600" />
                <span className="font-medium text-slate-700">Audio Recording</span>
              </div>
              <audio 
                controls 
                src={audioURL} 
                className="w-full"
                style={{
                  borderRadius: '8px',
                  outline: 'none'
                }}
              />
            </div>
          )}

          {/* Transcript Display */}
          {showTranscript && transcript.trim() && (
            <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <FileText size={16} className="text-green-600" />
                <span className="font-medium text-slate-700">Transcription</span>
              </div>
              <div className="text-slate-800 leading-relaxed bg-slate-50 rounded-lg p-3">
                {transcript}
              </div>
              <div className="mt-3 text-xs text-slate-500">
                Words: {transcript.trim().split(/\s+/).filter(word => word.length > 0).length} • 
                Characters: {transcript.trim().length}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}