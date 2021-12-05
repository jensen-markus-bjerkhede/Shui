import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './../router'

Vue.use(Vuex)

const API = 'http://localhost:3000';

export default new Vuex.Store({
  state: {
    streams: []
  },
  mutations: {
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
  }
})