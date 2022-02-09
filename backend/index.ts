import express from 'express';
const app = express();
import http from 'http'
const server = http.createServer(app)
import { Server } from 'socket.io'
const io = new Server(server, {
  cors: {
    origin: ["localhost:8080", "https://dev.example.com"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
})
import { MessageDto } from './dto/message.dto';
// rest of the code remains same
const PORT = 8000;
app.get('/', (req, res) => res.send('Express + TypeScript Server'));

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

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});