import React, { useEffect, useRef } from "react";

export default function CameraPreview() {
  const videoRef = useRef(null);

  useEffect(() => {
    async function enableCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera error:", err);
      }
    }
    enableCamera();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col items-center">
      <h3 className="text-sm font-semibold text-[#012A4A] mb-2">Camera Preview</h3>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-full rounded-lg border border-gray-200"
      ></video>
      
    </div>
  );
}
