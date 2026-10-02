import MazeScene from '../three/MazeScene';
import { Maze, RoomState, PlayerState } from '../types';

function pct(maze: Maze, nodeId: number) {
  const n = maze.nodes[nodeId];
  return Math.round(((n.row + n.col) / (2 * (maze.size - 1))) * 100);
}

function describeStatus(p: PlayerState) {
  if (p.answerStatus === 'pending') return 'Thinking...';
  if (p.answerStatus === 'submitted') return 'Answer submitted';
  if (p.answerStatus === 'correct' && p.movementStatus === 'choosing') return 'Correct — Choosing path';
  if (p.answerStatus === 'correct' && p.movementStatus === 'moved') return 'Correct — Moved';
  if (p.answerStatus === 'wrong') return 'Wrong';
  return 'Idle';
}

export default function AdminGame({ room, maze }: { room: RoomState; maze: Maze }) {
  return (
    <div className="fullscreen">
      <MazeScene maze={maze} players={room.players} mode="admin" />
      <div className="dashboard">
        <h2>GARDEN ESCAPE — ADMIN</h2>
        <h3>ROUND {room.round}</h3>
        {Object.values(room.players).map((p) => (
          <div key={p.role} className="dash-row">
            <strong>{p.role}</strong>
            <span>Score: {p.score}</span>
            <span>Position: {pct(maze, p.currentNode)}%</span>
            <span>Status: {describeStatus(p)}</span>
            {!p.connected && <span className="warn">⚠ DISCONNECTED</span>}
          </div>
        ))}
      </div>
    </div>
  );
}