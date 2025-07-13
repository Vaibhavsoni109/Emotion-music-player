import React, { useState, useEffect } from 'react';
import CameraFeed from './components/CameraFeed';
import MusicPlayer from './components/MusicPlayer';
import { addEmotionToHistory } from './utils/emotionHistory';
import { loadModels, detectEmotion } from './components/EmotionDetector';
import { emotionToMusic } from './utils/emotionToMusic';
import { getEmotionHistory, clearEmotionHistory } from './utils/emotionHistory';
import './App.css';
import EmotionHistory from './components/EmotionHistory';

function App() {
  const [videoEl, setVideoEl] = useState(null);
  const [emotion, setEmotion] = useState('');
  const [musicUrl, setMusicUrl] = useState('');
  const [cameraRunning, setCameraRunning] = useState(true);
  const [manualMode, setManualMode] = useState(false);
  const [playerFull, setPlayerFull] = useState(false);
  const fallbackEmotions = ['happy', 'sad', 'angry', 'neutral'];

  useEffect(() => {
    loadModels();
  }, []);

  useEffect(() => {
    let interval;
    if (videoEl && cameraRunning && !manualMode) {
      interval = setInterval(async () => {
        const detected = await detectEmotion(videoEl);
        if (detected && detected !== emotion) {
          setEmotion(detected);
          setMusicUrl(emotionToMusic[detected]);
          addEmotionToHistory(detected);
        }
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [videoEl, cameraRunning, manualMode]);

  const toggleCamera = () => {
    if (cameraRunning) {
      if (videoEl?.srcObject) videoEl.srcObject.getTracks().forEach(t => t.stop());
      setCameraRunning(false);
    } else {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoEl) videoEl.srcObject = stream;
          setCameraRunning(true);
        })
        .catch(err => alert('Camera error'));
    }
  };

  const handleManualEmotion = (emo) => {
    setEmotion(emo);
    setMusicUrl(emotionToMusic[emo]);
    addEmotionToHistory(emo);
  };

  return (
    <div className="App">
      <h1>🎶 Mood-Based Music Player 🎶</h1>

      <div className="camera-section">
        {!manualMode && cameraRunning && <CameraFeed onLoaded={setVideoEl} />}
        <button className="button" onClick={toggleCamera}>
          {cameraRunning ? '🛑 Stop Camera' : '🎥 Start Camera'}
        </button>
        <button className="button" onClick={() => setManualMode(!manualMode)}>
          {manualMode ? '🔁 Use Camera' : '⚠️ Manual Input'}
        </button>
      </div>

      {manualMode && (
        <div className="fallback-buttons">
          <p>Select your emotion manually:</p>
          {fallbackEmotions.map(emo => (
            <button key={emo} className="button" onClick={() => handleManualEmotion(emo)}>
              {emo}
            </button>
          ))}
        </div>
      )}

      {emotion && <h2>Detected Emotion: {emotion}</h2>}

      {musicUrl && (
        <div className={playerFull ? 'music-player-fullscreen' : 'music-player'}>
          {console.log(musicUrl)}
          <MusicPlayer url={musicUrl} autoPlay fullscreen={playerFull} />
        </div>
      )}

      <EmotionHistory/>
    </div>
  );
}

export default App;
