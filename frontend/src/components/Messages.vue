<template>
  
</template>

<script>
export default {
    name: 'Messages',
    data(){
        return {
            name: Array,
            content: Array,
            stream: Array,
            uuid: Array
        }
    },
    methods: {
        createMessage(){
            this.$store.dispatch('messages', { name: this.name, content: this.content, stream: this.stream, uuid: this.uuid  })
        }
    }
}
</script>

<style>

</style>