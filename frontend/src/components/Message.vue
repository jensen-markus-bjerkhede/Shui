<template>
  <section>
      <p>name: {{ name }}</p>
      <p>{{ getDecryptedContent(content) }}</p>
      <span v-for="stream in streams" :key="stream">
        #{{stream}}
      </span>
    </section>
</template>

<script>
import CryptoJS from "crypto-js";

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
    getDecryptedContent(content) {
      return CryptoJS.AES.decrypt(content, sessionStorage.getItem('userkey')).toString(CryptoJS.enc.Utf8);
    },
  },
};
</script>

<style>
</style>