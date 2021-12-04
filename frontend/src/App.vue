<template>
  <div id="app">
    <img class="stream-banner" src="@/assets/streamsbanner.svg" alt="">
    <router-view/>
  </div>
</template>
<script>
</script>

<style lang="scss">
  @import '@/scss/main';
  

.center-flexbox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.stream-banner {
    position: absolute;
    left: 32px;
    z-index: 10;
  }
</style>
