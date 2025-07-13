import React, { useState, useEffect } from 'react';
import CameraFeed from './components/CameraFeed';
import MusicPlayer from './components/MusicPlayer';
import { loadModels, detectEmotion } from './components/EmotionDetector';
import { emotionToMusic } from './utils/emotionToMusic';
import './App.css';

function App() {
  const [videoEl, setVideoEl] = useState(null);
  const [emotion, setEmotion] = useState('');
  const [musicUrl, setMusicUrl] = useState('');
const [cameraRunning, setCameraRunning] = useState(true);
const toggleCamera = () => {
  if (cameraRunning) {
    // Stop camera stream
    if (videoEl && videoEl.srcObject) {
      videoEl.srcObject.getTracks().forEach(track => track.stop());
    }
    setCameraRunning(false);
  } else {
    // Restart camera
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoEl) {
          videoEl.srcObject = stream;
        }
        setCameraRunning(true);
      })
      .catch(err => {
        console.error("Error starting camera:", err);
        alert("Could not start camera.");
      });
  }
};


  useEffect(() => {
    loadModels();
  }, []);

  useEffect(() => {
    let interval;
    if (videoEl) {
      interval = setInterval(async () => {
        console.log("Detecting emotion...");
        const detected = await detectEmotion(videoEl);
        console.log("Detected emotion:", detected);
        if (detected && detected !== emotion) {
          console.log(emotionToMusic[detected])
          setEmotion(detected);
          setMusicUrl(emotionToMusic[detected] || '');
        }
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [videoEl, emotion]);
  const handleStopAndFullscreen = () => {
  // Stop webcam
  if (videoEl && videoEl.srcObject) {
    videoEl.srcObject.getTracks().forEach(track => track.stop());
  }

};


  return (
    <div className="App" style={{ textAlign: 'center' }}>
     <h1>🎵 Mood Music AI 🎵</h1>
  

     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  {cameraRunning && <CameraFeed onLoaded={setVideoEl} />}
  <button onClick={toggleCamera} className="button" style={{ marginTop: '12px' }}>
    {cameraRunning ? '🛑 Stop Camera' : '🎥 Start Camera'}
  </button>
</div>

      {emotion && <h2>Detected Emotion: {emotion}</h2>}
      {musicUrl && <MusicPlayer url={musicUrl} />}
    </div>
  );
}

export default App;
