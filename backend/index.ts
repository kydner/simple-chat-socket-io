import express from 'express';
const app = express();
import http from 'http'
const server = http.createServer(app)
import { Server } from 'socket.io'
const io = new Server(server)
// rest of the code remains same
const PORT = 8000;
app.get('/', (req, res) => res.send('Express + TypeScript Server'));

io.on('connection', (socket) => {
  console.log('a user connected')
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