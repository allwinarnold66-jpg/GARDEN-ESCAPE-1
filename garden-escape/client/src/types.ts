export type PlayerRole = 'HR' | 'MARKETING' | 'FINANCE' | 'OPERATIONS';

export interface MazeNode {
  id: number; row: number; col: number;
  open: { N: boolean; E: boolean; S: boolean; W: boolean };
}
export interface Maze { size: number; nodes: MazeNode[]; start: number; finish: number; }

export interface PlayerState {
  role: PlayerRole;
  connected: boolean;
  currentNode: number;
  facing: 'N' | 'E' | 'S' | 'W';
  score: number;
  answerStatus: 'idle' | 'pending' | 'submitted' | 'correct' | 'wrong';
  movementStatus: 'idle' | 'waiting' | 'choosing' | 'done' | 'moved';
}
export type PlayersState = Record<PlayerRole, PlayerState>;

export interface RoomState {
  roomCode: string;
  phase: 'lobby' | 'study' | 'question' | 'finished';
  round: number;
  winner: PlayerRole | null;
  players: PlayersState;
}

export interface QuestionPayload { id: string; text: string; options: string[]; round: number; }
export interface AnswerResult { correct: boolean; availableDirections?: string[]; score: number; }