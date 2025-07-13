// src/components/CameraFeed.jsx
import React, { useRef, useEffect } from 'react';

const CameraFeed = ({ onLoaded }) => {
  const videoRef = useRef();

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          onLoaded(videoRef.current);
        }
      } catch (err) {
        console.error("Camera error:", err);
      }
    };

    startCamera();
  }, [onLoaded]);

  return (
    <div className="camera-container">
      <video ref={videoRef} autoPlay muted width="400" height="300" style={{ borderRadius: '12px' }} />
    </div>
  );
};

export default CameraFeed;
