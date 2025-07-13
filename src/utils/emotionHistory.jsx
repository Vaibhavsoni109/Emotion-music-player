// src/utils/emotionHistory.js
const KEY = 'emotion-history';

export const addEmotionToHistory = (emotion) => {
  const history = JSON.parse(localStorage.getItem(KEY)) || [];
  history.push({ emotion, time: new Date().toISOString() });
  localStorage.setItem(KEY, JSON.stringify(history));
};

export const getEmotionHistory = () => {
  return JSON.parse(localStorage.getItem(KEY)) || [];
};

export const clearEmotionHistory = () => {
  localStorage.removeItem(KEY);
};
