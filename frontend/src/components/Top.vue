<template>
  <header>
    <img src="@/assets/logo.svg" alt="logo" />
    <p>Shui</p>
  </header>
</template>

<script>
export default {
  name: "Top",
};
</script>

<style lang="scss">
header {
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;

  > img {
    height: 2rem;
    margin-right: 0.5rem;
  }

  p {
    color: white;
    font-weight: 800;
    font-size: 1.5rem;
    margin: 0;
    padding: 0;
  }
}
</style>