// src/components/EmotionDetector.js
import * as faceapi from 'face-api.js';

export const loadModels = async () => {
  const MODEL_URL = '/models';
  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
    faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
  ]);
};

export const detectEmotion = async (videoEl) => {
  const detection = await faceapi
    .detectSingleFace(videoEl, new faceapi.TinyFaceDetectorOptions())
    .withFaceExpressions();

  if (detection && detection.expressions) {
    const sorted = Object.entries(detection.expressions).sort((a, b) => b[1] - a[1]);
    return sorted[0][0]; // e.g., "happy", "sad"
  }

  return null;
};
