// utils/emotionToMusic.js
const mood = "happy hindi";
export const emotionToMusic = {
  
  happy: `https://www.youtube.com/results?search_query=${encodeURIComponent(mood)}`,
  sad: 'https://www.youtube.com/watch?v=r_3zVIyblLQ&list=RDr_3zVIyblLQ&start_radio=1&rv=pIvf9bOPXIw',   // Sad Piano
  angry: 'https://www.youtube.com/watch?v=XQ7z57qrZU8', // Heavy rock
  surprised: 'https://www.youtube.com/watch?v=2Vv-BfVoq4g', // Ed Sheeran
  disgusted: 'https://www.youtube.com/watch?v=6Dh-RL__uN4',
  fearful: 'https://www.youtube.com/watch?v=kXYiU_JCYtU', // Linkin Park
  neutral: 'https://www.youtube.com/watch?v=V8zXLMIjlcw&list=PLdEo6JVKn9gt_1Ff6p_OsvP6iJ-Z6a5Yq', // Lofi
};
