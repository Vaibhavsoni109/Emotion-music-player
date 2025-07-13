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

  return (
    <div className="App" style={{ textAlign: 'center' }}>
      <h1>🎶 Mood-Based Music Player 🎶</h1>
      <CameraFeed onLoaded={setVideoEl} />
      {emotion && <h2>Detected Emotion: {emotion}</h2>}
      {musicUrl && <MusicPlayer url={musicUrl} />}
    </div>
  );
}

export default App;
