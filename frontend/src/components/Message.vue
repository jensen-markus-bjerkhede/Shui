<template>
<div>
<div class="padding-top">
  <section class="message-container">
    <div class="messages">
    <p class="message">{{ getDecryptedContent(content) }}</p>
    <div class="name-container"><img class="rectangle" src="@/assets/Rectangle.svg" alt=""><span> {{ name }}</span></div>
    </div>
  </section>
  </div>
  <div>
  <span class="message-stream-style" v-for="stream in streams" :key="stream"> #{{ stream }} </span>
  </div>
  </div>
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
.message-container {
  display: flex;
  padding: 0 1rem;
}
.messages {
  width: 100%;
  background: #FFFFFF;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  position: relative;
}
.message {
  text-align: left;
  padding-left: 15px;
}
.message-stream-style { 
 padding-left: 15px;
 font-family: PT Sans;
 font-style: normal;
 font-weight: normal;
 font-size: 18px;
 line-height: 23px;
 color: rgba(0, 178, 255, 0.8);
}
.name-container {
  padding-left: 15px;
  padding-bottom: 10px;
  text-align: left;
}
.name-container > span {
  font-family: PT Sans;
  font-style: italic;
  font-weight: bold;
  font-size: 17px;
  line-height: 150%;
  color: #000000;
  padding-left: 5px;
}
.rectangle {
  padding-bottom: 3px;
}
</style>