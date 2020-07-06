<template>
    <TodoApp/>
</template>

<script>
    import TodoApp from './todo/TodoApp';
    import store from '../store/todo/store';

    export default {
        name: "home",
        data() {
            return {}
        },
        store,
        components: {
            TodoApp
        }
    }

</script>

<style scoped>

</style>