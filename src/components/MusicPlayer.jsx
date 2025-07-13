import React from 'react';
import ReactPlayer from 'react-player';

const MusicPlayer = ({ url }) => {
  if (!url) return null;

  return (
    <div className='music-player' style={{ marginTop: '20px', width:"90vw" }}>
     <ReactPlayer src={url} playing controls muted={false} />

    </div>
  );
};

export default MusicPlayer;
