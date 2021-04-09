
    computed: {
     getStreams() {
        return this.$store.state.streams;
      }
    },
    beforeMount(){
      this.$store.dispatch('fetchStreams')
    },
    methods: {
      goTo() {
        this.$router.push('/stream')
      }
    }
}