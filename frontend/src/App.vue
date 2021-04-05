<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import '@/scss/main';
  .waves {
  padding: 0;
  width: 100%;
  bottom: 0;
  left: 0;
}

.center-flexbox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
