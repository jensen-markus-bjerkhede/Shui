<template>
  <div id="Landing" class="center-flexbox">
    <nav>
      <router-link to="/register">Create Account</router-link>
      <router-link to="/sign-in">Sign-in</router-link>
    </nav>
    <waves/>
  </div>
</template>

<script>
// import ShuiBanner from "@/components/ShuiBanner.vue"
import Waves from '../components/Waves.vue'

export default {
  name: 'Landing',
  components: {
    Waves,
  }
}
</script>