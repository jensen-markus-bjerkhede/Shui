<template>
  <div id="Landing" class="center-flexbox">
    <img src="@/assets/logo.svg" alt="Shiu logo">
    <h1>SHUI</h1>
    <h2>FLOW FREELY</h2>
    <nav>
      <router-link class="link" to="/register">Create Account</router-link>
      <router-link class="link" to="/login">Sign-in</router-link>
    </nav>
    <waves />
  </div>
</template>

<script>
// import ShuiBanner from "@/components/ShuiBanner.vue"
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
#landing {
  margin: auto;
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
    color: $yellow;
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
a {
  text-decoration: none;
  color: white;
  margin: 1rem
  }
  .link {
    color: white;
  }
.footer {
  width: 100%
}
</style>
