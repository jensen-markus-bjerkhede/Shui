import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './../router'
import CryptoJS from 'crypto-js';

Vue.use(Vuex)

const API = 'http://localhost:3000';

function getBearerToken() {
  return 'Bearer ' + sessionStorage.getItem('token')
}

export default new Vuex.Store({
  state: {
    streams: []
  },
  mutations: {
    updateStreams(state, streams) {
      console.log("update", streams)
      state.streams = streams;
    },
    hideStream(state, stream) {
      const index = state.streams.indexOf(stream);
      if (index > -1) {
        state.streams.splice(index, 1);
      }
    }
  },
  actions: {
    async login(ctx, credentials) {

      const loginRequest = {
        method: 'POST',
        url: `${API}/auth/login`,
        headers: {'Content-Type': 'application/json'},
        data: {username: credentials.username, password: credentials.password}
      };

      return new Promise(async (resolve, reject) => {
        axios.request(loginRequest).then((response) => {
          sessionStorage.setItem('token', response.data.token);
          sessionStorage.setItem('userkey', response.data.userkey);
          resolve();
        }).catch((error) => {
          reject(error);
        });
      });
    },
    async register(ctx, credentials) {

      const createUserRequest = {
        method: 'POST',
        url: `${API}/users/create`,
        headers: {'Content-Type': 'application/json'},
        data: {username: credentials.username, password: credentials.password}
      };

      axios.request(createUserRequest).then(() => {
        router.push('/login')
      }).catch((error) => {
        console.error(error);
      });
    },
    async createMessage(ctx, message) {
      let encryptedMessage = CryptoJS.AES.encrypt(message.content, sessionStorage.getItem('userkey')).toString();

      const createMessageRequest = {
        method: 'POST',
        url: `${API}/messages/create`,
        headers: {
          Authorization: getBearerToken()
        },
        data: { name: message.name, content: encryptedMessage, stream: message.streams }
      };

      axios.request(createMessageRequest).then((response) => {
        return response;
      }).catch((error) => {
        console.error(error);
      });
    },

    async fetchMessages(store) {

      const getMessagesRequest = {
        method: 'GET',
        url: `${API}/messages/list`,
        params: {streams: store.getters.getStreamsString()},
        headers: {
          Authorization: getBearerToken()
        }
      };

      return new Promise(async (resolve, reject) => {
        axios.request(getMessagesRequest).then((response) => {
          console.log("data", response)
          resolve(response.data)
        }).catch((error) => {
          reject(error)
        });
      });
    },
    async fetchStreams(ctx) {
      const getStreamsRequest = {
        method: 'GET',
        url: `${API}/streams/list`,
        headers: {
          Authorization: getBearerToken()
        }
      };

      return new Promise(async (resolve, reject) => {
        axios.request(getStreamsRequest).then((response) => {
          resolve(response);
        }).catch((error) => {
          reject(error);
        });
      });
    },
    async createStream(ctx, streamName) {
      const createStreamRequest = {
        method: 'POST',
        url: `${API}/streams/create`,
        headers: {
          Authorization: getBearerToken(),
          'Content-Type': 'application/json'
        },
        data: {name: streamName}
      };

      axios.request(createStreamRequest).then((response) => {
        ctx.state.streams.push(response)
      }).catch((error) => {
        console.error(error);
      });

    },
    async hideStream(ctx, stream) {


    },
  },
  getters: {
    getStreamsString(state) {
      return state.streams.join();
    },
  },
  modules: {
  }
})
