import { RoomState } from '../types';

export default function GameOver({ room, myRole }: { room: RoomState; myRole: any }) {
  const winner = room.winner;
  return (
    <div className="center card">
      {myRole === 'ADMIN' && <h1>🏆 {winner} WINS!</h1>}
      {myRole === winner && <h1>🏆 YOU WIN!</h1>}
      {myRole !== winner && myRole !== 'ADMIN' && <h1>{winner} has reached the finish.</h1>}
      <h3>Final Scores</h3>
      <ul>
        {Object.values(room.players).map((p) => (
          <li key={p.role}>{p.role}: {p.score}</li>
        ))}
      </ul>
    </div>
  );
}