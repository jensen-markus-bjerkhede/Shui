<template>
  <section>
    <!-- <input v-model="name" type="text" /> -->
    <article
      v-for="stream in streams"
      :key="stream.name"
      class="center-flexbox"
    >
      <p>#{{ stream.name }}</p>
      <button class="delete-stream-button" @click="deleteStream(stream.name)">
        Ta bort
      </button>
    </article>

    <article class="add-stream">#<input v-model="name" type="text" /></article>
    <div class="create-message-button-container">
      <button class="create-message-button" @click="createStream()">
        Skapa Stream
      </button>
    </div>
    <div class="forget-me">
      <button class="create-message-button" @click="deleteUser()">
        Shit they're on to me!
      </button>
    </div>
  </section>
</template>
<script>
import axios from "axios";

export default {
  name: "Settings",
  data() {
    return {
      name: "",
      streams: [],
    };
  },
  beforeMount() {
    this.fetchStreams();
  },
  methods: {
    async createStream() {
      const token = "Bearer " + sessionStorage.getItem("token");
      const data = { name: this.name };
      const createStreamRequest = {
        method: "POST",
        url: "http://localhost:3000/streams/create",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        data: data,
      };

      await axios
        .request(createStreamRequest)
        .then((response) => {
          if (response.status === 201) {
            this.name = "";
            this.fetchStreams();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async fetchStreams() {
      const token = "Bearer " + sessionStorage.getItem("token");
      const request = {
        url: "http://localhost:3000/streams/list",
        method: "get",
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
      };

      await axios(request)
        .then((response) => {
          if (response.status === 200) {
            if (response.data) {
              this.streams = response.data;
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async deleteStream(name) {
      const token = "Bearer " + sessionStorage.getItem("token");
      const data = { name: name };
      const request = {
        url: "http://localhost:3000/streams/delete",
        method: "delete",
        data: data,
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
      };

      await axios(request)
        .then((response) => {
          if (response.status === 204) {
            this.fetchStreams();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async deleteUser() {
      const token = "Bearer " + sessionStorage.getItem("token");
      const request = {
        url: "http://localhost:3000/users/delete",
        method: "delete",
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
      };

      await axios(request)
        .then((response) => {
          if (response.status === 204) {
            sessionStorage.cler();
            this.$router.push("/removed");
          }
        })
        .catch((error) => {
          console.error(error);
        });
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