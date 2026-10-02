import { useState } from 'react';
import { useGameState } from './hooks/useGameState';
import Home from './screens/Home';
import JoinForm from './screens/JoinForm';
import AdminLobby from './screens/AdminLobby';
import MazeStudy from './screens/MazeStudy';
import AdminGame from './screens/AdminGame';
import PlayerGame from './screens/PlayerGame';
import GameOver from './screens/GameOver';

export default function App() {
  const gs = useGameState();
  const [mode, setMode] = useState<'home' | 'admin' | 'player'>('home');

  if (mode === 'home') {
    return <Home onAdmin={() => { gs.createRoom(); setMode('admin'); }} onPlayer={() => setMode('player')} />;
  }

  if (mode === 'player' && !gs.myRole) {
    return <JoinForm gs={gs} onBack={() => setMode('home')} />;
  }

  if (!gs.room) return <div className="center">Connecting...</div>;

  if (gs.room.phase === 'finished') {
    return <GameOver room={gs.room} myRole={gs.myRole} />;
  }

  if (gs.room.phase === 'study' && gs.maze) {
    return <MazeStudy maze={gs.maze} duration={gs.studyDuration} myRole={gs.myRole} room={gs.room} />;
  }

  if (gs.myRole === 'ADMIN') {
    if (gs.room.phase === 'lobby') return <AdminLobby room={gs.room} onStart={gs.startCompetition} />;
    if (gs.maze) return <AdminGame room={gs.room} maze={gs.maze} />;
    return <div className="center">Preparing maze...</div>;
  }

  // player
  if (gs.room.phase === 'lobby') return <div className="center">Waiting for ADMIN to start the competition...</div>;
  if (gs.maze) return <PlayerGame gs={gs} />;
  return <div className="center">Loading maze...</div>;
}