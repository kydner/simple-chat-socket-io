<template>
  <q-page class="flex flex-center">
    <div
      style="width: 100%; max-width: 600px; height: 80vh; padding: 2em"
      class="shadow-2 flex column justify-end"
    >
      <q-chat-message
        name="me"
        avatar="https://cdn.quasar.dev/img/avatar1.jpg"
        :text="['hey, how are you?']"
        stamp="7 minutes ago"
        sent
        bg-color="amber-7"
      />
      <q-chat-message
        name="Jane"
        avatar="https://cdn.quasar.dev/img/avatar5.jpg"
        :text="['doing fine, how r you?']"
        stamp="4 minutes ago"
        text-color="white"
        bg-color="primary"
      />
      <div class="q-pt-lg">
        <q-input outlined v-model="message" :dense="true">
          <template v-slot:append>
            <q-icon
              v-if="message !== ''"
              name="close"
              @click="message = ''"
              class="cursor-pointer"
            />
            <q-icon name="send" class="cursor-pointer" />
          </template>
        </q-input>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",
  data() {
    return {
      message: null,
    };
  },
};
</script>
<style lang="scss" scoped></style>
