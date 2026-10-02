# Garden Escape — Real-Time 5-Laptop Multiplayer

## Architecture
- Backend: Node.js + Express + Socket.IO (server-authoritative game state)
- Frontend: React + TypeScript + Vite + Three.js (@react-three/fiber / drei)
- 1 Admin + 4 Players (HR, MARKETING, FINANCE, OPERATIONS) join ONE shared room.

## No Question Timer
Questions have NO countdown. A round only advances once ALL FOUR players
have submitted an answer. The ONLY timer in the entire system is the
20-second "Study the Maze" phase before the race begins.

## Local Setup

Terminal 1 (server):
    cd server
    npm install
    npm start
    # runs on http://localhost:4000

Terminal 2 (client):
    cd client
    npm install
    npm run dev
    # runs on http://localhost:5173

Open the client URL in 5 separate browser windows (or 5 laptops on the
same network, pointing VITE_SERVER_URL at the server's LAN/deployed URL):

1. Window 1 → click "I am ADMIN" → get Room Code (e.g. GE4827)
2. Windows 2-5 → click "I am a PLAYER" → enter room code → pick HR / MARKETING / FINANCE / OPERATIONS
3. Admin clicks "START COMPETITION" once all 4 show CONNECTED
4. All screens show "STUDY THE MAZE" for 20 seconds
5. Race begins — each player sees ONLY their own first-person view
6. All 4 players get simultaneous (different) questions, no timer
7. Round advances only after all 4 answer
8. Correct players choose FORWARD / BACKWARD / LEFT / RIGHT
9. First to reach the finish node triggers GAME_OVER on all 5 screens

## Deployment

**Important:** GitHub Pages can ONLY host the static frontend. It CANNOT
run the Socket.IO server (no persistent Node process / WebSocket support).

- Deploy `server/` to a Node-capable host that supports WebSockets:
  Render, Railway, Fly.io, a VPS, etc.
- Deploy `client/` to GitHub Pages, Vercel, or Netlify.
- Set the environment variable on the client build:
      VITE_SERVER_URL=https://your-backend-host.example.com
- All 5 laptops simply open the deployed frontend URL — no local install
  needed on game day.

## Extending the Question Bank
`server/questions.js` currently ships 200 questions (50 per role: 15
hand-written case studies + 35 generated-but-verifiably-correct numerical
reasoning questions). Add more objects to the `*_MANUAL` arrays to grow
the hand-written pool — format:
    { text: "...", options: ["A","B","C","D"], correctIndex: 1 }

## Maze size / difficulty
Change `generateMaze(6)` in `gameManager.js` to a larger/smaller grid
(e.g. `generateMaze(8)`) for a longer/shorter competition.