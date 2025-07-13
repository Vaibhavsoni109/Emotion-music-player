// components/EmotionHistory.jsx
import React from 'react';
import { getEmotionHistory, clearEmotionHistory } from '../utils/emotionHistory';

const EmotionHistory = () => {
  const history = getEmotionHistory();

  return (
    <div>
      <h3>🧠 Your Emotion History</h3>
      <ul>
        {history.map((item, i) => (
          <li  style={{textDecoration:'none'}} key={i}>
            <strong>{item.emotion}</strong> – {new Date(item.time).toLocaleString()}
          </li>
        ))}
      </ul>
      <button className="button" onClick={clearEmotionHistory}>🗑️ Clear History</button>
    </div>
  );
};

export default EmotionHistory;
