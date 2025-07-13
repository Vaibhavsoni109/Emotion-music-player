// src/components/MusicPlayer.jsx
import React from 'react';
import ReactPlayer from 'react-player';

const MusicPlayer = ({ url, autoPlay, fullscreen }) => {
  if (!url) return null;

  return (
    <div className="music-player-container">
      <ReactPlayer
        src={url}  // ✅ Important: must be `url`, not `src`
        playing={autoPlay}
        controls
        width={fullscreen ? '100vw' : '90%'}
        height={fullscreen ? '90vh' : '360px'}
      />
    </div>
  );
};

export default MusicPlayer;
