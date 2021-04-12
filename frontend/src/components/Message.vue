<template>
  <section v-if="streams">
    <p>{{name}}}</p>
    <p>{{content}}}</p>
    <p>{{getStreamsString()}}</p>
    <p>{{name}}}</p>
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
    return {

    };
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
      let streamsString = '';
      this.streams.forEach((stream) => {
        streamsString += '#' + stream + ' ';
      })
      return streamsString;
    }
  },
};
</script>

<style>
</style>