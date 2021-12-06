<template>
  <section id="stream">
    <section v-for="message in messages" :key="message.id">
      <Message
        :streams="message.streams"
        :content="message.content"
        :name="message.name"
      />
    </section>
    <img
      class="create-msg"
      src="../assets/create-msg.svg"
      @click="newMessage()"
      alt="Create message"
    />
  </section>
</template>

<script>
import Message from "../components/Message";
import axios from "axios";

export default {
  components: { Message },
  name: "Stream",
  data() {
    return {
      messages: Array,
    };
  },
  beforeMount() {
    this.fetchMessages();
  },
  methods: {
    newMessage() {
      this.$router.push("/newMessage");
    },
    async fetchMessages() {
      const token = "Bearer " + sessionStorage.getItem("token");
      const getMessagesRequest = {
        method: "GET",
        url: "http://localhost:3000/messages/list",
        headers: {
          Authorization: token,
        },
      };

      await axios(getMessagesRequest)
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            this.messages = response.data;
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style lang="scss">
@import "./../scss/variables";

#stream {
  padding-top: 3rem;
}
#login {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    margin-top: auto;
  }
  .padding {
    padding: 2rem;
  }
  h1 {
    font-size: 3rem;
    color: white;
    margin: 0.5rem 0;
  }

  h2 {
    margin: 0;
    font-size: 1.3rem;
    text-transform: uppercase;
    max-width: 16rem;
    text-align: center;
  }

  section {
    width: 100%;
    margin-top: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}
.footer {
  width: 100%;
}
.create-msg {
  position: fixed;
  bottom: 20px;
  right: 15px;
}

</style>