# Ascend: Mission Control for Your Life

**Ascend** is a heavily gamified, personal progression dashboard designed to look and feel like a deep-space mission control center. Stop treating your habits and goals like a boring checklist and start treating them like an interstellar expedition.

![Ascend Theme](https://www.transparenttextures.com/patterns/stardust.png)

## Features

- 🌌 **Galactic Ascension Route:** A beautiful, linear deep-space navigation route mapping your journey from Initiate to Mythic. As your overall level increases, your current position beacon travels through visually distinct command sectors, displaying precisely how far you are from your next Rank.
- 🚀 **Command Classes:** Progress through ranks (Initiate, Seeker, Vanguard, Ascendant, Paragon, Mythic). Your entire HUD interface dynamically shifts colors and glowing borders based on your active Command Class.
- ⚙️ **Core Systems:** Track your daily habits through a ship diagnostics panel. Maintain your "System Integrity" percentages by keeping essential routines online.
- 📡 **Classified Transmissions:** Log one-off tasks, reading sessions, and deep work using the "Neural Uplink" terminal interface.
- 🔬 **Research Objectives:** Track long-term study goals and projects using radial, data-driven telemetry charts.
- 🎯 **Special Operations:** Complete daily and recurring missions to earn Momentum (M).
- 🎵 **Web Audio API Engine:** Fully synthesized, ambient cosmic UI sounds and chimes generated purely by the browser—zero external audio dependencies.

## Tech Stack

**Frontend:**
- React (Vite)
- Tailwind CSS
- Framer Motion (Animations)
- Lucide React (Icons)
- Web Audio API (Synthesizer)

**Backend:**
- Node.js & Express
- MongoDB & Mongoose
- RESTful Architecture

## Getting Started

### 1. Database Setup
Ensure you have MongoDB running locally or a MongoDB Atlas URI. 
Create a `.env` file in the `backend` directory:
```env
MONGO_URI=mongodb://127.0.0.1:27017/ascend
PORT=5000
```

### 2. Backend Initialization
```bash
cd backend
npm install
npm run seed  # (Optional) Seed the database with initial habits and quests
node server.js
```

### 3. Frontend Initialization
Ensure you have the API URL set in `frontend/src/config/api.js` (default is `http://localhost:5000/api`).
```bash
cd frontend
npm install
npm run dev
```

## Aesthetic Philosophy
Ascend is designed to be 95% dashboard and 5% atmosphere. The UI relies on frosted glass (`backdrop-blur`), subtle glowing borders, slow-drifting starfields, and clean, monospaced typography to evoke games like *Mass Effect*, *Destiny*, and *Elite Dangerous* without compromising daily productivity functionality.

---
*Commander, your mission awaits.*
