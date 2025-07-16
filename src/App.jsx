import React, { useState, useEffect } from 'react';
import CameraFeed from './components/CameraFeed';
import MusicPlayer from './components/MusicPlayer';
import { addEmotionToHistory } from './utils/emotionHistory';
import { loadModels, detectEmotion } from './components/EmotionDetector';
import { emotionToMusic } from './utils/emotionToMusic';
import { getEmotionHistory, clearEmotionHistory } from './utils/emotionHistory';
import './App.css';
import EmotionHistory from './components/EmotionHistory';
import { getPlaylistFromSaavn } from './utils/savanApi';


function App() {
  const [emotionPlaylists, setEmotionPlaylists] = useState({});
const [playedSongs, setPlayedSongs] = useState({});
  const [videoEl, setVideoEl] = useState(null);
  const [emotion, setEmotion] = useState('');
  const [musicUrl, setMusicUrl] = useState('');
  const [cameraRunning, setCameraRunning] = useState(true);
  const [manualMode, setManualMode] = useState(false);
 const [selectedCategory, setSelectedCategory] = useState('hindi');
  const fallbackEmotions = ['happy', 'sad', 'angry', 'neutral'];
  const [songInfo, setSongInfo] = useState(null);


  useEffect(() => {
    loadModels();
  }, []);

 // ✅ Define it OUTSIDE useEffect
const handleDetectedEmotion = async (emo) => {
  if (emo == "happy")
  {
    emo = "Latest"
  }
  console.log(emo)
  const query = `${selectedCategory} ${emo}`;
  let playlist = emotionPlaylists[query];


  if (!playlist || playlist.length < 60) {
    const fetched = await getPlaylistFromSaavn(query);
    if (fetched.length === 0) return alert("No songs found for this mood.");
    playlist = fetched.slice(0, 60);
    setEmotionPlaylists(prev => ({ ...prev, [query]: playlist }));
  }

  const history = playedSongs[query] || [];
  const unplayed = playlist.filter(song => !history.includes(song.id));
  const available = unplayed.length > 0 ? unplayed : playlist;

  const randomSong = available[Math.floor(Math.random() * available.length)];

  setEmotion(emo);
  setMusicUrl(randomSong.audioUrl);
  setSongInfo(randomSong);

  setPlayedSongs(prev => ({
    ...prev,
    [query]: [...(history.length >= 60 ? [] : history), randomSong.id],
  }));
};

;


useEffect(() => {
  let interval;
  if (videoEl && cameraRunning && !manualMode) {
    interval = setInterval(async () => {
      const detected = await detectEmotion(videoEl);
      if (detected) handleDetectedEmotion(detected);
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
    
    setMusicUrl(handleDetectedEmotion(emo));
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
      <div className="selector">
  <label htmlFor="language">🎧 Choose Language/Category:</label>
  <select id="language" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
    <option value="hindi">Hindi</option>
    <option value="english">English</option>
    <option value="bhojpuriLatest">Bhojpuri</option>
    <option value="punjabiLatest">Punjabi</option>
    <option value="hindi old">Hindi Old</option>
    <option value="hindi latest">Hindi Latest</option>
    <option value="romantic">Romantic</option>
    <option value="party">Party</option>
    <option value="Anup%20Jalota">BhaktiHindi</option>
  </select>
</div>


      {emotion && <h2>Detected Emotion: {emotion}</h2>}

      {musicUrl && (
        <div className="player">
          <audio controls autoPlay src={musicUrl} style={{ width: '90%' }} />
          {songInfo && (
            <div>
              {console.log(musicUrl)}
              <img src={songInfo.image} alt={songInfo.title} width={100} />
              <h3>{songInfo.title}</h3>
              <p>{songInfo.artist}</p>
            </div>
          )}
        </div>
      )}


      <EmotionHistory />
    </div>
  );
}

export default App;
