<template>
  <q-page class="flex flex-center">
    <div>
      <div
        style="
          z-index: 0;
          overflow: auto;
          width: 70vw;
          height: 80vh;
          padding: 2em;
        "
        class="shadow-2"
      >
        <div v-for="(chat, index) in chatList" :key="index" class="q-mb-lg">
          <q-chat-message
            :name="chat.name"
            :avatar="chat.avatar"
            :text="[chat.message]"
            :stamp="chat.stamp"
            :sent="chat.sent"
            :bg-color="chat.bgColor"
          />
        </div>
      </div>
      <div class="chat-text q-pt-lg">
        <q-input
          outlined
          v-model="message"
          :dense="true"
          placeholder="Write message here"
          @keydown.enter.prevent="sendMessage"
        >
          <template v-slot:append>
            <q-icon
              v-if="message !== ''"
              name="close"
              @click="message = ''"
              class="cursor-pointer"
            />
            <q-icon name="send" class="cursor-pointer" @click="sendMessage" />
          </template>
        </q-input>
      </div>
    </div>
  </q-page>
</template>

<script>
import { io } from "socket.io-client";
const socket = io("localhost:8000");
export default {
  name: "PageIndex",
  data() {
    return {
      message: null,
      chatList: [],
      username: null,
    };
  },
  created() {
    this.chatList = [];
    socket.on("connected", () => {
      console.log(socket.id);
    });
    socket.on("welcome", (data) => {
      this.chatList.push(data);
    });
    socket.on("chat_message", (data) => {
      this.chatList.push(data);
    });
    const getRandomString = (length) => {
      var randomChars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var result = "";
      for (var i = 0; i < length; i++) {
        result += randomChars.charAt(
          Math.floor(Math.random() * randomChars.length)
        );
      }
      return result;
    };
    /// set random username and random min length and max length
    this.username = getRandomString(
      Math.floor(Math.random() * (10 - 3 + 1)) + 3
    );
  },
  methods: {
    sendMessage() {
      /// validate if null message
      if (this.message) {
        const message = {
          name: this.username,
          message: this.message,
          avatar: "https://cdn.quasar.dev/img/avatar2.jpg",
          stamp: "1 minute ago",
          sent: true,
          bgColor: "primary",
        };
        socket.emit("chat_message", message);
        this.message = null;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.chat-text {
  position: absolute;
  bottom: 0.5em;
  right: 1em;
  left: 1em;
  z-index: 1;
}
</style>
