import { createServer } from "http";
import { Server, Socket } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  // ...
});
import { MessageDto } from './dto/message.dto';
// rest of the code remains same
const PORT = 8000;

let welcome:MessageDto = {
  name:'Bot', 
  avatar:'https://cdn.quasar.dev/img/avatar1.jpg', 
  message: 'Welcome to my paradise', 
  stamp: '27 sec ago', 
  sent: false, 
  bgColor:'amber-7'
};

io.on('connection', (socket) => {
  console.log('a user connected')
  io.sockets.emit('welcome', welcome)
  socket.on('chat_message', (msg) => {
    console.log('message: ' + msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
})

httpServer.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});