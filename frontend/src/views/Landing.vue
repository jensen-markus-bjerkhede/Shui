<template>
  <div id="Landing" class="center-container">
    <img src="@/assets/logo.svg" alt="Shiu logo">
    <h1 class="landing-h1" >SHUI</h1>
    <h2 class="landing-h2" >FLOW FREELY</h2>
    <nav>
      <router-link class="link" to="/register">Create Account</router-link>
      <router-link class="link" to="/login">Sign-in</router-link>
    </nav>
    <div class="landing">
    <waves />
    </div>
  </div>
</template>

<script>
import Waves from "../components/Waves.vue";

export default {
  name: "Landing",
  components: {
    Waves,
  },
};
</script>
<style lang="scss">
@import './../scss/variables';

  .link {
  text-decoration: none;
  color: white;
  margin: 1rem
  }

.landing > .waves-footer {
    position: absolute;
    bottom: 0;
    right: 0;
}
.center-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 15rem;
}
.landing-h1 {
  color: #ffffff;
  margin: 0.5rem;
}
.landing-h2 {
  color: #00B2FF;
  margin: 0.5rem;
}
</style>