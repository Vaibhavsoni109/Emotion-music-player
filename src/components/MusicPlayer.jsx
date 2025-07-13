import React from 'react';
import ReactPlayer from 'react-player';

const MusicPlayer = ({ url }) => {
  if (!url) return null;

  return (
    <div className='music-player' >
      
     <ReactPlayer src={url} playing controls muted={false} style={{ marginTop: '20px', width:"90vw" }} />

    </div>
  );
};

export default MusicPlayer;
