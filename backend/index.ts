import { createServer } from "http";
import { Server, Socket } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  // ...configure socket
});
import { MessageDto } from "./dto/message.dto";
/// declare default port
const PORT = 8000;

/// default message on client connected
let welcomeMessage: MessageDto = {
  name: "Bot Chat",
  avatar: "https://cdn.quasar.dev/img/avatar1.jpg",
  message: "Welcome to my paradise",
  stamp: "27 sec ago",
  sent: false,
  bgColor: "amber-7",
};

io.on("connection", (socket) => {
  console.log("a user connected");
  setTimeout(() => {
    /// send message when user connected
    io.sockets.emit("welcome", welcomeMessage);
  }, 2000);
  socket.on("chat_message", (data: MessageDto) => {
    console.log("message: " + data);

    io.sockets.emit("chat_message", data);

    /// auto reply message if word contains string of hello
    if (data.message.toLocaleLowerCase().includes("hello")) {
      const message: MessageDto = {
        name: "Bot Chat",
        message: `Hello too ${data.name}`,
        avatar: "https://cdn.quasar.dev/img/avatar1.jpg",
        bgColor: "amber-7",
        sent: false,
        stamp: "1 sec ago",
      };
      io.sockets.emit("chat_message", message);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

httpServer.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
