import  socketIo  from 'socket.io-client';

export const socketId = socketIo("http://playpitch.online", { transports: ["websocket"] });