import { useEffect, useState, useCallback } from 'react';
import { socket } from '../socket';
import { Maze, PlayerRole, RoomState, QuestionPayload, AnswerResult } from '../types';

export function useGameState() {
  const [myRole, setMyRole] = useState<'ADMIN' | PlayerRole | null>(null);
  const [roomCode, setRoomCode] = useState('');
  const [room, setRoom] = useState<RoomState | null>(null);
  const [maze, setMaze] = useState<Maze | null>(null);
  const [studyDuration, setStudyDuration] = useState(20000);
  const [myQuestion, setMyQuestion] = useState<QuestionPayload | null>(null);
  const [myResult, setMyResult] = useState<AnswerResult | null>(null);
  const [joinError, setJoinError] = useState('');

  useEffect(() => {
    const onState = (s: RoomState) => setRoom(s);
    const onStudy = (d: { maze: Maze; duration: number }) => { setMaze(d.maze); setStudyDuration(d.duration); };
    const onQuestion = (q: QuestionPayload) => { setMyQuestion(q); setMyResult(null); };
    const onResult = (r: AnswerResult) => { setMyResult(r); setMyQuestion(null); };

    socket.on('state:update', onState);
    socket.on('phase:study', onStudy);
    socket.on('question:assigned', onQuestion);
    socket.on('answer:result', onResult);

    return () => {
      socket.off('state:update', onState);
      socket.off('phase:study', onStudy);
      socket.off('question:assigned', onQuestion);
      socket.off('answer:result', onResult);
    };
  }, []);

  const createRoom = useCallback(() => {
    socket.emit('admin:createRoom', (res: { roomCode: string; state: RoomState }) => {
      setRoomCode(res.roomCode);
      setRoom(res.state);
      setMyRole('ADMIN');
    });
  }, []);

  const checkRoom = useCallback((code: string, cb: (res: any) => void) => {
    socket.emit('player:checkRoom', { roomCode: code }, cb);
  }, []);

  const joinRoom = useCallback((code: string, role: PlayerRole) => {
    socket.emit('player:joinRoom', { roomCode: code, role }, (res: any) => {
      if (res.success) {
        setRoomCode(code);
        setRoom(res.state);
        setMaze(res.maze || null);
        setMyRole(role);
        setJoinError('');
        if (res.myQuestion) setMyQuestion(res.myQuestion);
        if (res.myResult) setMyResult(res.myResult);
      } else {
        setJoinError(res.error || 'Could not join room');
      }
    });
  }, []);

  const startCompetition = useCallback(() => {
    socket.emit('admin:startCompetition', { roomCode });
  }, [roomCode]);

  const submitAnswer = useCallback((answerIndex: number) => {
    socket.emit('player:submitAnswer', { roomCode, role: myRole, answerIndex });
  }, [roomCode, myRole]);

  const chooseDirection = useCallback((direction: string) => {
    socket.emit('player:chooseDirection', { roomCode, role: myRole, direction });
  }, [roomCode, myRole]);

  return {
    myRole, roomCode, room, maze, studyDuration, myQuestion, myResult, joinError,
    createRoom, checkRoom, joinRoom, startCompetition, submitAnswer, chooseDirection
  };
}