import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './../router'
import CryptoJS from 'crypto-js';

Vue.use(Vuex)

const API = 'http://localhost:3000/v2';

export default new Vuex.Store({
  state: {
    plainView: Object,
    passwords: []
  },
  mutations: {
    setTokenAndKey(state, tokenAndKey) {
      state.token = tokenAndKey.token;
      state.userkey = tokenAndKey.userkey;
    },
    setLckd(state, passwords) {
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

      // Route to /passwords
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
  },
  modules: {
  }
})
