<template>
    <tomato/>
</template>

<script>
    import tomato from './tomatoTimer/tomato'
    import store from './tomatoTimer/store'

    export default {
        name: "today-item",
        store:store,
        components: {
            tomato,
        }
    }
</script>

<style scoped>

</style>