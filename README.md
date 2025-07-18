# 🎵 Emotion-Based Music Player 🎭🎶

An AI-powered web application that plays songs based on your facial expressions in real-time using your device's camera. Detect your mood and let the music match your emotions — powered by face-api.js and JioSaavn's (Unofficial) music API.

![Emotion Music Player Screenshot](./public/screenshot.png)

---

## 📌 Features

- 🎥 Real-time facial emotion detection via webcam
- 🎶 Automatically fetches and plays matching Hindi songs from **JioSaavn** based on your mood
- 💡 Clean and intuitive UI
- ⚙️ Built with React.js, face-api.js, and Axios
- 📱 Responsive Design for mobile and desktop

---

## 🧠 How It Works

1. The app uses your webcam and analyzes facial expressions using **face-api.js**.
2. It detects emotions like `happy`, `sad`, `angry`, `surprised`, etc.
3. Based on the dominant emotion, it fetches a relevant Hindi song playlist using the **JioSaavn (Unofficial) API**.
4. The detected emotion and fetched song are displayed, and playback begins.

---

## 🛠️ Tech Stack

| Category       | Technologies                              |
|----------------|--------------------------------------------|
| Frontend       | React.js, Tailwind CSS, HTML, CSS         |
| AI / ML        | face-api.js (built on TensorFlow.js)      |
| Music API      | [JioSaavn Unofficial API](https://saavn.dev) |
| HTTP Client    | Axios                                      |
| Others         | Webpack, Git, GitHub Pages                 |

---

## 📷 Emotions Detected

- 😊 Happy
- 😢 Sad
- 😠 Angry
- 😲 Surprised
- 😐 Neutral

> Future improvements will include emotions like Disgusted, Fearful, etc.

---

## 🚀 Getting Started

### Prerequisites

- Node.js and npm installed

### Installation

```bash
git clone https://github.com/Vaibhavsoni109/Emotion-music-player.git
cd Emotion-music-player
npm install
npm start