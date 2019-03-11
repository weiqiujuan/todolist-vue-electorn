<template>
    <div>
        <todoApp/>
    </div>
</template>

<script>
    import todoApp from './todo/todoApp';
    import store from '../store/todo/store';

    export default {
        name: "home",
        data() {
            return {}
        },
        store,
        components: {
            todoApp
        }
    }

</script>

<style scoped>

</style>