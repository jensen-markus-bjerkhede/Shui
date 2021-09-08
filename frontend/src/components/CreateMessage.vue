<template>
  <section v-if="streams">
    <p>{{ name }}}</p>
    <p>{{ content }}}</p>
    <p>{{ name }}}</p>
  </section>
</template>

<script>
import axios from "axios";
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
    createMessage() {},
  },
};
</script>

<style>
</style>