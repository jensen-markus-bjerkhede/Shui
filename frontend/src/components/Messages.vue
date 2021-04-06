<template></template>

<script>
export default {
  name: "Messages",
  data() {
    return {
      name: "",
      content: "",
      stream: "",
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
  },
};
</script>

<style>
</style>