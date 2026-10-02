const ROLES = ['HR', 'MARKETING', 'FINANCE', 'OPERATIONS'];
const rooms = new Map();

function genCode() {
  return 'GE' + Math.floor(1000 + Math.random() * 9000);
}

function createRoom(adminSocketId) {
  let code;
  do { code = genCode(); } while (rooms.has(code));

  const room = {
    roomCode: code,
    adminSocketId,
    phase: 'lobby', // lobby | study | question | finished
    round: 0,
    maze: null,
    winner: null,
    questionSets: null,
    currentQuestions: null,
    players: {}
  };

  ROLES.forEach((r) => {
    room.players[r] = {
      role: r,
      socketId: null,
      connected: false,
      currentNode: 0,
      facing: 'S',
      score: 0,
      answerStatus: 'idle',     // idle|pending|submitted|correct|wrong
      movementStatus: 'idle',   // idle|waiting|choosing|done|moved
      selectedAnswer: null
    };
  });

  rooms.set(code, room);
  return room;
}

function getRoom(code) {
  return rooms.get((code || '').toUpperCase());
}

module.exports = { createRoom, getRoom, ROLES, rooms };