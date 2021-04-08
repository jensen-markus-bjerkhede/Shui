import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './../router'
import CryptoJS from 'crypto-js';

Vue.use(Vuex)

const API = 'http://localhost:3000';

export default new Vuex.Store({
  state: {
    streams: Array
  },
  mutations: {
    setTokenAndKey(state, tokenAndKey) {
      state.token = tokenAndKey.token;
      state.userkey = tokenAndKey.userkey;
    },
    setShui(state, passwords) {
      state.passwords = passwords;
    },
    setPlainView(state, plainView) {
      state.plainView = plainView;
    }
  },
  actions: {
    async login(ctx, cred) {

      let resp = await axios.post(`${API}/auth/login`, {
        username: cred.username,
        password: cred.password
      });

      // Session Storage
      sessionStorage.setItem('token', resp.data.token);
      sessionStorage.setItem('userkey', resp.data.userkey);

      router.push('/passwords')

    },
    async register(ctx, cred) {

      let resp = await axios.post(`${API}/users/create`, {
        username: cred.username,
        password: cred.password
      });

      router.push('/login')

    },
    async createMessage(ctx, message) {
      const bearerToken = 'Bearer ' + sessionStorage.getItem('token')

      let encryptedMessage = CryptoJS.AES.encrypt(message.content, sessionStorage.getItem('userkey')).toString();

      const request = {
        method: 'POST',
        url: `${API}/messages/create`,
        headers: {
          Authorization: bearerToken
        },
        data: { name: message.name, content: encryptedMessage, stream: message.stream }
      };

      axios.request(request).then((response) => {
        console.log(response.data);
      }).catch((error) => {
        console.error(error);
      });

      router.push('/stream')
    },
    async fetchStreams(ctx) {
      try {
        const streams = await axios.get(`${ctx.state.API}/streams`, {
          headers: {
            authorization: bearerToken
          }
        })
        ctx.commit('streams', streams.data);
      } catch (err) {
        console.log(err)
      }
    },
    async createdStream(ctx, newStream) {
      const createdStream = await axios.post(
        `${ctx.state.API}/streams`,
        {
          data: newStream.data,
          hashtags: newStream.hashtags,
        },
        {
          headers: {
            authorization: bearerToken
          },
        }
      );
      router.push('/stream')
      console.log("newStream", createdStream);
    },
  },
  modules: {
  }
})
