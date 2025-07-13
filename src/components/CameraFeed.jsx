// components/CameraFeed.jsx
import React, { useRef, useEffect } from 'react';

const CameraFeed = ({ onLoaded }) => {
  const videoRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        onLoaded(videoRef.current);
      });
  }, []);

  return <video ref={videoRef} autoPlay width="400" height="300" />;
};

export default CameraFeed;
