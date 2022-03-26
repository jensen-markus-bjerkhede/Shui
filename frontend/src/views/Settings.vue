<template>
  <section id="settings">
    <h2 class="settings-h2">Streams</h2>
    <article
      v-for="stream in streams"
      :key="stream.name"
      class="center-flexbox-stream"
    >
      <section class="stream-border">
        <span class="stream-name">#{{ stream.name }} </span>
        <img
          class="remove-button"
          src="../assets/cross.svg"
          @click="deleteStream(stream.name)"
          alt=""
        />
      </section>
    </article>

    <article class="add-stream">
      <input placeholder="Stream name" v-model="name" type="text" />
      <input placeholder="Password" v-model="password" type="password" />
    </article>
    <div class="create-message-button-container">
      <button class="create-message-button" @click="createStream()">
        Skapa Stream
      </button>
    </div>
    <div class="create-message-button-container forget-padding">
      <div class="forget-me">
        <button class="create-message-button" @click="deleteUser()">
          Shit they're on to me!
        </button>
      </div>
    </div>
    <div @click="goBack()" class="go-back">Go back</div>
  </section>
</template>
<script>
import axios from "axios";

export default {
  name: "Settings",
  data() {
    return {
      name: "",
      password: "",
      streams: [],
    };
  },
  beforeMount() {
    this.fetchStreams();
  },
  methods: {
    async createStream() {
      const token = "Bearer " + sessionStorage.getItem("token");
      const data = { name: this.name, password: this.password };
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
            this.password = "";
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
            sessionStorage.clear();
            this.$router.push("/removed");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },

    goBack() {
      this.$router.push("/stream");
    },
  },
};
</script>

<style>
::placeholder {
  color: #ffffff;
  opacity: 0.8;
}
#settings {
  background-color: #ef4343;
}
.remove-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 32px;
  background: rgba(255, 255, 255, 0.2);
}
.triangle {
  align-self: flex-end;
}
.create-message-button-container {
  display: flex;
  justify-content: center;
}
.forget-padding {
  padding-bottom: 1rem;
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
  color: #ffffff;
  background: #19274a;
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
.center-flexbox-stream {
  display: inline-flex;
  margin: 0 auto;
}
.stream-border {
  margin-top: 9px;
  margin-left: 15px;
  display: flex;
  align-items: center;
  height: 32px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}
.stream-name {
  padding-right: 13px;
  padding-left: 9px;
  color: #ffffff;
  font-style: italic;
  margin-left: 15px;
}
.settings-h2 {
  color: #ffffff;
  margin: 0;
  font-weight: bold;
  padding-top: 74px;
  padding-left: 52px;
}
.add-stream {
  padding: 1rem;
}
.go-back {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #ffffff;
  border: solid 1px #ffffff;
  background-color: #ef4343;
  border-radius: 4px;
}
</style>  