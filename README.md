<p align="center">
  <img src="https://img.shields.io/badge/🎮_NAVAGRAM-Misinformation_Simulator-10B981?style=for-the-badge&labelColor=0f172a" alt="Navagram Banner" />
</p>

<h1 align="center">🕵️ Navagram — Misinformation Simulator</h1>

<p align="center">
  <em>An immersive, AI-powered detective game where you investigate the spread of rumors and misinformation in an Indian village</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active_Development-brightgreen?style=flat-square" alt="Status" />
  <img src="https://img.shields.io/badge/License-Apache_2.0-blue?style=flat-square" alt="License" />
  <img src="https://img.shields.io/badge/PRs-Welcome-orange?style=flat-square" alt="PRs Welcome" />
</p>

---
## 🌐 Live Demo

🚀 Play Navagram instantly in your browser — no installation required:

👉 **https://navagram-zeta.vercel.app/**

> 💡 For the best experience, play on desktop with sound enabled.

## 📖 About

**Navagram** is an interactive, browser-based detective simulation game built to raise awareness about misinformation and its impact on rural communities. You play as **Agent Mahabali**, an undercover investigator sent to the fictional village of *Navagram* to uncover the truth behind a series of strange whispers, sabotaged infrastructure, and coordinated misinformation campaigns orchestrated by a shadowy villain.

The game spans **3 in-game days**, each with unique objectives, mechanics, and escalating tension — all set against a beautifully rendered tile-based village map with smooth camera tracking, ambient background music, and AI-powered NPC interactions.

---

## 🖼️ Tech Stack

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Express-4-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Gemini_AI-3.1_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini AI" />
  <img src="https://img.shields.io/badge/ElevenLabs-TTS-FF6F00?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJ3aGl0ZSIgZD0iTTkgMmg2djIwSDl6Ii8+PC9zdmc+&logoColor=white" alt="ElevenLabs" />
  <img src="https://img.shields.io/badge/Motion-12-FF4154?style=for-the-badge&logo=framer&logoColor=white" alt="Motion" />
  <img src="https://img.shields.io/badge/Lucide-Icons-F56040?style=for-the-badge&logo=feather&logoColor=white" alt="Lucide" />
  <img src="https://img.shields.io/badge/Node.js-Runtime-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
</p>

---

## ✨ Features

### 🗺️ Immersive Village Map
- **40×40 tile-based world** with multiple terrain types — grass, roads, buildings, fences, and trees
- **Smooth camera tracking** with `requestAnimationFrame` interpolation — no jitter, no React re-renders
- **6 explorable locations**: Chai Nashta Point, Old Banyan Tree, North Fields, Village Hall, Library, and the Abandoned Warehouse
- On-screen control hints and an interactive **Map Legend** compass panel

### 🎭 3-Day Story Arc

| Day | Objective | Mechanics |
|-----|-----------|-----------|
| **Day 1 — The Whispers** | Collect rumors from villagers at the Chai Nashta Point | Talk to NPCs, learn 2 key rumors, watch your Brainwashed Meter rise |
| **Day 2 — The Truth** | Verify rumors at their real-world locations | ⏱ 5-minute real-time timer, interactive mini-games, collect hidden clue digits |
| **Day 3 — The Warehouse** | Stop the villain at the Abandoned Warehouse | Use collected clues to unlock a PIN pad and catch the villain |

### 🧩 Interactive Mini-Games
- **🔌 Wire Task** (Old Banyan Tree) — Match colored wires to extract drone surveillance data
- **⚙️ Pump Task** (North Fields) — Press pressure valves in ascending order to restart the sabotaged water pump

### 🤖 AI-Powered NPC — Byte Baba
- **Gemini 3.1 Flash** powered conversational AI oracle
- Provides context-aware **walkthrough hints**, **riddles**, **village jokes**, and **meme ideas**
- Full awareness of current game state (day, clues, objective, timer)
- **ElevenLabs voice synthesis** (optional) — gives Byte Baba a theatrical old-man voice with smooth audio playback
- Quick action buttons: *"What Next?"*, *"Need A Hint"*, *"Riddle Me"*, *"Village Joke"*, *"Meme This"*

### 🎵 Immersive Audio System
- **Persistent background music** (BGM) loop that survives all screen transitions and React re-renders
- **Smart audio ducking** — BGM volume smoothly fades when day announcements play, then restores
- **Per-day voice announcements** for Day 1, Day 2, and Day 3 transitions

### 📱 Agent Phone
- In-game phone overlay (press `P`) to track:
  - Collected rumors and their verification status (✅ True / ❌ False / ⬜ Unverified)
  - Collected clue digits for the Day 3 PIN pad

### 📊 HUD & Status System
- **Top Bar** with day/time info, Brainwashed Meter, player position, and reputation score
- **Field Logs** panel with color-coded, filterable event history
- **Day Transition** cinematic overlays with animated text

---

## 🏗️ Architecture

```
Navagram/
├── server.ts                    # Express + Vite middleware + Gemini/ElevenLabs API proxy
├── index.html                   # SPA entry point
├── vite.config.ts               # Vite config with Tailwind plugin & API proxy
├── tsconfig.json                # TypeScript configuration (ES2022, bundler resolution)
├── tts.js                       # Standalone ElevenLabs TTS test script
├── .env.example                 # Environment variable template
│
├── public/
│   ├── panchayat-bgm.mp3       # Background music loop
│   ├── day1-announcement.mp3   # Day 1 narration
│   ├── day2-announcement.mp3   # Day 2 narration
│   └── day3-announcement.mp3   # Day 3 narration
│
└── src/
    ├── main.tsx                 # React DOM entry
    ├── App.tsx                  # Root component — game loop, state, bgm, key bindings
    ├── index.css                # Global styles
    ├── types.ts                 # TypeScript interfaces (Position, Rumor, Location, etc.)
    │
    ├── models/
    │   ├── Agent.ts             # NPC Agent class (movement, state, rumors)
    │   └── Simulation.ts       # SimulationEngine — rumor engine, verification, fact-checking
    │
    ├── data/
    │   ├── config.ts            # Game constants (e.g., DAY_2_TIMER_LIMIT = 300s)
    │   ├── dialogue.ts          # NPC dialogue flavor text pool
    │   ├── locations.ts         # Village location definitions (positions, clues, colors)
    │   ├── map.ts               # 40×40 tile map generation from a 20×20 base pattern
    │   └── rumors.ts            # Rumor database with credibility, tags, and verification locations
    │
    ├── lib/
    │   └── utils.ts             # cn() utility (clsx + tailwind-merge)
    │
    └── components/
        ├── StartScreen.tsx      # Landing page with glassmorphism UI & floating particles
        ├── GameMap.tsx           # Tile grid, camera system, player/NPC sprite rendering
        ├── TopBar.tsx            # HUD — day info, brainwashed meter, position, reputation
        ├── DialogueModal.tsx     # NPC chat panel with AI chatbot integration
        ├── AgentPhone.tsx        # In-game phone overlay for rumor/clue tracking
        ├── DayTransition.tsx     # Full-screen cinematic day transition overlay
        ├── PinpadModal.tsx       # Day 3 warehouse PIN pad challenge
        ├── Day3PopupModal.tsx    # Day 3 alert popup with villain warning
        ├── CluePopupModal.tsx    # Animated clue discovery popup
        ├── NoCluePopupModal.tsx  # "Nothing found" popup with time penalty
        ├── LocationsHint.tsx     # Map legend compass popup
        ├── GameOverScreen.tsx    # Win/Lose screen with stats summary
        │
        └── minigames/
            ├── WireTask.tsx      # Wire-matching minigame (drone investigation)
            └── PumpTask.tsx      # Valve-ordering minigame (pump investigation)
```

---

## 🎮 Controls

| Key | Action |
|-----|--------|
| `↑` `↓` `←` `→` or `W` `A` `S` `D` | Move your character around the map |
| `E` | Interact with nearby NPCs or search locations |
| `P` | Open/close the Agent Phone |
| `Escape` | Close dialogue or phone |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- A **Google Gemini API key** (for the Byte Baba AI NPC)
- *(Optional)* An **ElevenLabs API key** + **Voice ID** (for Byte Baba's voice)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/Navagram_MisINFO_Simu.git
cd Navagram_MisINFO_Simu/Navagram

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
```

Edit `.env` with your API keys:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here          # Optional
ELEVENLABS_VOICE_ID=your_old_man_voice_id_here           # Optional
ELEVENLABS_MODEL_ID=eleven_multilingual_v2               # Optional
```

### Running the Game

```bash
# Start the development server (Express + Vite in one process)
npm run dev
```

Open **http://localhost:3000** in your browser — the Express server serves both the API and the Vite HMR client.

### Building for Production

```bash
npm run build
npm start
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check — returns `{ ok: true }` |
| `POST` | `/api/chatbot` | Forwards chat messages to Gemini AI, optionally synthesizes Byte Baba's voice via ElevenLabs |

### `/api/chatbot` Request Body

```json
{
  "message": "What should I do next?",
  "history": [{ "sender": "player", "text": "Hello!" }, { "sender": "npc", "text": "Welcome!" }],
  "playerName": "Mahabali",
  "gameState": {
    "day": 2,
    "currentObjective": "Verify rumors...",
    "knownRumors": [{ "id": "drone-banyan", "text": "...", "verified": "unverified" }]
  }
}
```

---

## 🧠 How the Simulation Works

### Rumor Engine
1. **Seeding** — Each interactive NPC starts with a specific rumor assigned in `Simulation.ts`
2. **Collection** — The player talks to NPCs at Chai Nashta Point to collect whispers (Day 1)
3. **Verification** — The player travels to physical locations and completes mini-games to verify each rumor (Day 2)
4. **Resolution** — Clue digits found during verification are assembled into a PIN code to unlock the villain's warehouse (Day 3)

### Brainwashed Meter
- Increases as the player collects **unverified rumors** (Day 1)
- Decreases as the player **verifies** rumors at their real locations (Day 2)
- Acts as a visual indicator of how much misinformation the player has absorbed

### NPC Movement
- **Interactive NPCs** (Aarti, Babu) stay stationary during Day 1 (at the café) and roam freely on Days 2+
- **Background NPCs** (10 villagers) wander randomly across the map at all times
- **Byte Baba** is stationary — always found near the eastern edge of the map at position `(36, 12)`

---

## 🗣️ Byte Baba — AI Oracle

Byte Baba is a **Gemini 3.1 Flash** powered NPC who acts as the player's in-game guide, entertainer, and walkthrough assistant.

### System Prompt Persona
> *"You are Byte Baba, the Edge Oracle of Navagram: sly, warm, playful, and a little theatrical. Speak like a memorable character in the village, not like a generic AI assistant."*

### Capabilities
- 🧭 **Context-aware guidance** — Knows the player's day, objective, position, timer, and rumor progress
- 🎯 **Actionable hints** — Tells the player exactly where to go and what to do next
- 🎭 **In-character entertainment** — Riddles, clean village jokes, and text-only meme ideas
- 🔊 **Voice output** — When ElevenLabs is configured, speaks with a custom voice (stability: 0.45, similarity: 0.75, style: 0.7)

---

## 🎨 Design Highlights

- **Glassmorphism** landing screen with floating ambient particles and gradient text
- **Pixel-art inspired** character sprites rendered with pure CSS (no image assets)
- **Smooth 60fps** camera and player movement via `requestAnimationFrame` + linear interpolation (lerp)
- **Cinematic transitions** between days with Motion (Framer Motion) animations
- **Responsive HUD** with adaptive layouts for desktop and mobile
- **Dark mode** UI with emerald accent color palette throughout

---

## 📦 Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^19.0.0 | UI framework |
| `react-dom` | ^19.0.0 | DOM rendering |
| `vite` | ^6.2.0 | Build tool & dev server |
| `typescript` | ~5.8.2 | Type safety |
| `tailwindcss` | ^4.1.14 | Utility-first CSS |
| `@tailwindcss/vite` | ^4.1.14 | Vite TailwindCSS integration |
| `express` | ^4.21.2 | API server |
| `@google/genai` | ^1.29.0 | Gemini AI SDK |
| `elevenlabs` | ^1.59.0 | Text-to-speech synthesis |
| `motion` | ^12.23.24 | Animation library (Framer Motion) |
| `lucide-react` | ^0.546.0 | Icon system |
| `clsx` + `tailwind-merge` | Latest | Conditional class utilities |
| `dotenv` | ^17.2.3 | Environment variable loading |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **Apache License 2.0** — see the source file headers for details.

---

<p align="center">
  <strong>Built with ❤️ to fight misinformation, one village at a time.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Made_with-React_+_Gemini_AI-10B981?style=for-the-badge" alt="Made with React + Gemini AI" />
</p>
