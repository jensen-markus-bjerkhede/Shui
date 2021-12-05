<template>
  <section>
    <!-- <input v-model="name" type="text" /> -->
    <article class="center-flexbox">
      <textarea
        style="resize: none"
        v-model="content"
        class="create-msg-container"
        id="text-area"
      ></textarea>
      <img class="triangle" src="@/assets/triangle.svg" alt="" />
    </article>

    <article class="add-message-stream">
      <input placeholder="streams" v-model="streams" type="text" />
    </article>
    <div class="create-message-button-container">
      <button class="create-message-button" @click="createMessage()">
        Publicera
      </button>
    </div>
  </section>
</template>
<script>
import CryptoJS from "crypto-js";
import axios from "axios";

export default {
  name: "NewMessage",
  data() {
    return {
      name: "",
      content: "",
      streams: "",
    };
  },
  methods: {
    createMessage() {
      const encryptedContent = CryptoJS.AES.encrypt(
        this.content,
        sessionStorage.getItem("userkey")
      ).toString();
      const token = "Bearer " + sessionStorage.getItem("token");
      const data = {
        name: this.name,
        content: encryptedContent,
        streams: this.streams,
      };
      const createMessageRequest = {
        method: "POST",
        url: "http://localhost:3000/messages/create",
        headers: {
          Authorization: token,
        },
        data: data,
      };

      axios
        .request(createMessageRequest)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.error(error);
        });

      this.$router.push("/stream");
    },
  },
};
</script>

<style>
.triangle {
  align-self: flex-end;
}
.create-message-button-container {
  display: flex;
  justify-content: center;
}
.create-message-button {
  font-family: PT Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 31px;
  margin-top: 1rem;
  width: 300px;
  height: 72px;
  border-style: none;
  background: #ef4343;
  border-radius: 4px;
}
.center-flexbox {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.add-message-stream {
  display: flex;
  justify-content: center;
}
.add-message-stream > input {
  border: solid 1px #ffffff;
  margin: 1rem 2.5rem;
  width: 80%;
}
.create-msg-container {
  margin-top: 5rem;
  position: static;
  width: 100%;
  height: 432px;
  background: #ffffff;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
}
</style> 