import  socketIo  from 'socket.io-client';

export const socketId = socketIo("http://localhost:3001", { transports: ["websocket"] });