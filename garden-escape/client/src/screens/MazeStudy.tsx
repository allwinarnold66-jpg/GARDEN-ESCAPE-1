import { useEffect, useState } from 'react';
import MazeScene from '../three/MazeScene';
import { Maze, RoomState } from '../types';

export default function MazeStudy({ maze, duration, room }: { maze: Maze; duration: number; myRole: any; room: RoomState }) {
  const [secondsLeft, setSecondsLeft] = useState(Math.ceil(duration / 1000));

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((duration - (Date.now() - start)) / 1000));
      setSecondsLeft(remaining);
      if (remaining <= 0) clearInterval(interval);
    }, 250);
    return () => clearInterval(interval);
  }, [duration]);

  return (
    <div className="fullscreen">
      <MazeScene maze={maze} players={room.players} mode="admin" />
      <div className="overlay-top">
        <h1>STUDY THE MAZE</h1>
        <h2>{secondsLeft}s</h2>
        <p>The race begins automatically — once questions start, there is NO time limit.</p>
      </div>
    </div>
  );
}