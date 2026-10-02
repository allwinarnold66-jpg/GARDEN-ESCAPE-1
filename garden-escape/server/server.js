const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const { createRoom, getRoom, ROLES } = require('./roomManager');
const { availableDirections } = require('./maze');
const gm = require('./gameManager');

const app = express();
app.use(cors());
app.get('/', (req, res) => res.send('Garden Escape Server Running'));

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  socket.on('admin:createRoom', (cb) => {
    const room = createRoom(socket.id);
    socket.join(room.roomCode);
    socket.data.roomCode = room.roomCode;
    socket.data.role = 'ADMIN';
    cb({ roomCode: room.roomCode, state: gm.sanitizedState(room) });
  });

  socket.on('admin:rejoin', ({ roomCode }, cb) => {
    const room = getRoom(roomCode);
    if (!room) return cb({ success: false });
    room.adminSocketId = socket.id;
    socket.join(room.roomCode);
    socket.data.roomCode = room.roomCode;
    socket.data.role = 'ADMIN';
    cb({ success: true, state: gm.sanitizedState(room), maze: room.maze || null });
  });

  socket.on('player:checkRoom', ({ roomCode }, cb) => {
    const room = getRoom(roomCode);
    if (!room) return cb({ exists: false });
    const taken = {};
    ROLES.forEach((r) => { taken[r] = room.players[r].connected; });
    cb({ exists: true, taken });
  });

  socket.on('player:joinRoom', ({ roomCode, role }, cb) => {
    const room = getRoom(roomCode);
    if (!room) return cb({ success: false, error: 'Room not found' });
    if (!ROLES.includes(role)) return cb({ success: false, error: 'Invalid role' });

    const p = room.players[role];
    if (p.connected) return cb({ success: false, error: `${role} already joined` });

    p.socketId = socket.id;
    p.connected = true;
    socket.join(room.roomCode);
    socket.data.roomCode = room.roomCode;
    socket.data.role = role;

    io.to(room.roomCode).emit('player:connectionChanged', { role, connected: true });
    gm.broadcastState(io, room);

    let myQuestion = null, myResult = null;
    if (room.phase === 'question' && room.currentQuestions) {
      const q = room.currentQuestions[role];
      if (p.answerStatus === 'pending' && q) {
        myQuestion = { id: q.id, text: q.text, options: q.options, round: room.round };
      } else if (p.answerStatus === 'correct' && p.movementStatus === 'choosing') {
        myResult = { correct: true, availableDirections: availableDirections(room.maze, p.currentNode, p.facing), score: p.score };
      } else if (p.answerStatus === 'wrong') {
        myResult = { correct: false, score: p.score };
      }
    }

    cb({ success: true, state: gm.sanitizedState(room), maze: room.maze || null, myQuestion, myResult });
  });

  socket.on('admin:startCompetition', ({ roomCode }) => {
    const room = getRoom(roomCode);
    if (!room || room.adminSocketId !== socket.id) return;
    gm.startCompetition(io, room);
  });

  socket.on('player:submitAnswer', ({ roomCode, role, answerIndex }) => {
    const room = getRoom(roomCode);
    if (!room) return;
    gm.handleSubmitAnswer(io, room, role, answerIndex);
  });

  socket.on('player:chooseDirection', ({ roomCode, role, direction }) => {
    const room = getRoom(roomCode);
    if (!room) return;
    gm.handleChooseDirection(io, room, role, direction);
  });

  socket.on('disconnect', () => {
    const { roomCode, role } = socket.data;
    if (!roomCode) return;
    const room = getRoom(roomCode);
    if (!room) return;

    if (role === 'ADMIN') {
      if (room.adminSocketId === socket.id) room.adminSocketId = null;
      return;
    }
    const p = room.players[role];
    if (p && p.socketId === socket.id) {
      p.connected = false;
      p.socketId = null;
      io.to(room.roomCode).emit('player:connectionChanged', { role, connected: false });
      gm.broadcastState(io, room);
    }
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Garden Escape server listening on port ${PORT}`));