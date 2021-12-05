<template>
  <section id="login">
    <img src="@/assets/logo.svg" alt="Shiu logo">
    <h1>SHUI</h1>
    <h2>FLOW FREELY</h2>
    <section class="padding">
      <input id="username" placeholder="Username" type="text" name="username" v-model="username">
      <input id="password" placeholder="Password" type="password" name="password" v-model="password">
      <a href="#" class="btn" @click.prevent="login">Logga in</a>
    </section>
    <Waves class="footer"/>
  </section>
</template>

<script>
import Waves from '../components/Waves.vue'
export default {
  components: {  Waves },
  name: 'Login',
  data(){
    return {
      error: false,
      username: '',
      password: ''
    }
  },
  methods: {
    async login() {
      const credentials = {username: this.username, password: this.password}
      this.$store.dispatch('login', credentials).then(() => {
        this.$router.push('stream')
      }, (e) => {
        console.log('Could not login', e.message)
      });
    }
  }
}
</script>

<style lang="scss">
@import './../scss/variables';

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
    margin: .5rem 0;
  }

  h2 {
    margin: 0;
    color: #00B2FF;
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
  width: 100%
}
</style>