// import something here

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'localhost:8000'
}))
