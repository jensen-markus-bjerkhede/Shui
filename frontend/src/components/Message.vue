<template>
  <section>
    <section v-if="streams">
      <p>{{ name }}</p>
      <p>{{ getDecryptedContent(content) }}</p>
      <p>{{ getStreamsString() }}</p>
<!--      <p>{{ stream }}</p>-->
    </section>
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
    getStreamsString() {
      let streamsString = "";
      this.streams.forEach((stream) => {
        streamsString += "#" + stream + " ";
      });
      return streamsString;
    },
    getDecryptedContent(content) {
      console.log('hemligt', CryptoJS.AES.encrypt('Detta är ett hemligt meddelande', sessionStorage.getItem('userkey')).toString());
      return CryptoJS.AES.decrypt(content, sessionStorage.getItem('userkey')).toString();
    },
  },
};
</script>

<style>
</style>