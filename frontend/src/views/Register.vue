<template>
  <main id="register">
    <img src="@/assets/logo.svg" alt="Shui logo" />
    <h1>SHUI</h1>
    <h2>FLOW FREELY</h2>
    <section>
      <input id="username" placeholder="Username" type="text" name="username" v-model="username" />
      <input id="password" placeholder="Password" type="password" name="password" v-model="password" />
      <a href="#" class="btn" @click.prevent="register">Registrera</a>
    </section>
    <Waves class="footer" />
  </main>
</template>

<script>
import Waves from "../components/Waves.vue";
export default {
  components: { Waves },
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    register() {
      this.$store.dispatch("register", {
        username: this.username,
        password: this.password,
      });
    },
  },
};
</script>

<style lang="scss">
@import "./../scss/variables";

#register {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    margin-top: auto;
  }

  h1 {
    font-size: 3rem;
    color: white;
    margin: 0.5rem 0;
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
    padding: 2rem;
    width: 100%;
    margin-top: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .footer {
    width: 100%;
  }
}
</style>