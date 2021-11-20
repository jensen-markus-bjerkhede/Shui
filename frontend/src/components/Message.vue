<template>
  <section>
    <input v-model="name" type="text" />
    <textarea v-model="content" type="text" />
    <input v-model="streams" type="text" />
    <button @click="createMessage()"></button>
    <section v-if="streams">
      <p>{{ name }}</p>
      <p>{{ content }}</p>
      <p>{{ getStreamsString() }}</p>
      <p>{{ stream }}</p>
    </section>
  </section>
</template>

<script>
export default {
  name: "Messages",
  props: {
    name: "",
    content: "",
    streams: Array,
  },
  data() {
    return {};
  },
  methods: {
    createMessage() {
      this.$store.dispatch("createMessage", {
        name: this.name,
        content: this.content,
        stream: this.stream,
      });
    },
    getStreamsString() {
      console.log(this.streams);
      let streamsString = "";
      this.streams.forEach((stream) => {
        streamsString += "#" + stream + " ";
      });
      return streamsString;
    },
  },
};
</script>

<style>
</style>