import { RoomState } from '../types';

export default function AdminLobby({ room, onStart }: { room: RoomState; onStart: () => void }) {
  const roles = Object.values(room.players);
  const allConnected = roles.every((p) => p.connected);

  return (
    <div className="center card">
      <h1>GARDEN ESCAPE</h1>
      <h2>ROOM CODE: {room.roomCode}</h2>
      <p>Waiting for players...</p>
      <ul className="status-list">
        {roles.map((p) => (
          <li key={p.role}>{p.connected ? '✓' : '🕒'} {p.role} — {p.connected ? 'CONNECTED' : 'Waiting...'}</li>
        ))}
      </ul>
      {allConnected ? (
        <>
          <p><strong>ALL PLAYERS READY</strong></p>
          <button className="primary" onClick={onStart}>START COMPETITION</button>
        </>
      ) : (
        <p>Waiting for all four roles to connect...</p>
      )}
    </div>
  );
}