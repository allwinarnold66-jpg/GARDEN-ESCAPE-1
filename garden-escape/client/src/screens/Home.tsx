export default function Home({ onAdmin, onPlayer }: { onAdmin: () => void; onPlayer: () => void }) {
  return (
    <div className="center card">
      <h1>🌿 GARDEN ESCAPE</h1>
      <p>Real-time 5-laptop maze competition</p>
      <button className="primary" onClick={onAdmin}>I am ADMIN — Create Room</button>
      <button className="primary" onClick={onPlayer}>I am a PLAYER — Join Room</button>
    </div>
  );
}