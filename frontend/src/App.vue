<template>
  <div id="app">
    <img
      class="stream-banner"
      src="@/assets/streamsbanner.svg"
      alt=""
      @click="verify()"
    />
    <router-view />
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "App",
  methods: {
    async verify() {
      const token = "Bearer " + sessionStorage.getItem("token");
      const request = {
        url: "http://localhost:3000/auth/verify",
        method: "get",
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
      };

      await axios(request)
        .then((response) => {
          if (response.status === 200) {
            if (response.data) {
              this.$router.push("/settings");
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/main";

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
