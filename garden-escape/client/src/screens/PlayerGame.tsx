import MazeScene from '../three/MazeScene';
import QuestionCard from '../components/QuestionCard';
import DirectionButtons from '../components/DirectionButtons';
import { PlayerState } from '../types';

function teammateLabel(p: PlayerState) {
  if (p.movementStatus === 'choosing') return 'Choosing path...';
  if (p.answerStatus === 'pending') return 'Thinking...';
  if (p.answerStatus === 'submitted') return 'Answer submitted';
  if (p.movementStatus === 'moved') return 'Moved';
  if (p.answerStatus === 'wrong') return 'Wrong answer';
  return '...';
}

export default function PlayerGame({ gs }: { gs: any }) {
  const { room, maze, myRole, myQuestion, myResult, submitAnswer, chooseDirection } = gs;
  const me: PlayerState = room.players[myRole];

  return (
    <div className="fullscreen">
      <MazeScene maze={maze} players={room.players} mode="player" selfRole={myRole} />

      <div className="hud-top">
        <h3>🌿 GARDEN ESCAPE — {myRole}</h3>
        <span>ROUND {room.round}</span>
        <span>SCORE: {me.score}</span>
      </div>

      <div className="panel">
        {myQuestion && me.answerStatus === 'pending' && (
          <QuestionCard question={myQuestion} onAnswer={submitAnswer} />
        )}

        {me.answerStatus === 'submitted' && (
          <div className="info-box">
            <p>✓ ANSWER SUBMITTED</p>
            <p>Waiting for the other players...</p>
          </div>
        )}

        {me.answerStatus === 'correct' && me.movementStatus === 'choosing' && myResult && (
          <div className="info-box success">
            <p>✓ CORRECT! Excellent! Choose your path.</p>
            <DirectionButtons available={myResult.availableDirections || []} onChoose={chooseDirection} />
          </div>
        )}

        {me.answerStatus === 'wrong' && (
          <div className="info-box error">
            <p>✕ WRONG ANSWER</p>
            <p>You cannot move this round.</p>
            <p>Waiting for the other players...</p>
          </div>
        )}

        <div className="teammate-status">
          {Object.values(room.players).filter((p: any) => p.role !== myRole).map((p: any) => (
            <div key={p.role}>{p.role}: {teammateLabel(p)}</div>
          ))}
        </div>
      </div>
    </div>
  );
}