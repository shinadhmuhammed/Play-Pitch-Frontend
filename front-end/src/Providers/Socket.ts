import  socketIo  from 'socket.io-client';

export const socketId = socketIo("https://playpitch.online/", { transports: ["websocket"] });