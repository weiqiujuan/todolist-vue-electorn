<style src="./todoApp.css"></style>
<template>
    <div>
        <section class="todoapp">
            <header class="header">
                <h4>todos</h4>
                <input type="text" class="new-todo" autofocus autocomplete="off" placeholder="What needs to be done?"
                       @keyup.enter="tryAddTodo">
            </header>
        </section>

        <section class="main">
            <input type="checkbox" class="toggle-all" :checked="allChecked" @change="toggleAll(!allChecked)">
            <ul class="todo-list">
                <todo v-for="todo in filteredTodos" :todo="todo"/>
            </ul>
        </section>

        <footer class="footer" v-show="todos.length">
        <span class="todo-count">
            <strong>{{remaining}}</strong>
            {{remaining|pluralize('item')}} left
        </span>
            <ul class="filters">
                <li v-for="(val,key) in filters">
                    <a :href="'#/' + key"
                       :class="{ selected: visibility === key }" @click="visibility = key">{{key|capitalize}}</a>
                </li>
            </ul>
            <button class="clear-completed"
                    v-show="todos.length > remaining"
                    @click="clearCompleted">
                Clear completed
            </button>
        </footer>
    </div>
</template>

<script>
    import Todo from './TodoItem'
    import {
        addTodo,
        toggleAll,
        clearCompleted
    } from "../../store/todo/action";

    const filters = {
        all: todos => todos,
        active: todos => todos.filter(todo => !todo.done),
        completed: todos => todos.filter(todo => todo.done)
    }
    export default {
        name: "todoApp",
        components: {Todo},
        vuex: {
            getters: {
                todos: state => state.todos
            },
            actions: {
                addTodo,
                toggleAll,
                clearCompleted,
            }
        },
        data() {
            return {
                visibility: 'all',
                filters: filters
            }
        },
        computed: {
            allChecked() {
                return this.todos.every(todo => todo.done)
            },
            filteredTodos() {
                return filters[this.visibility](this.todos)
            },
            remaining() {
                return this.todos.filter(todo => !todo.done).length
            }
        },
        methods: {
            tryAddTodo(e) {
                let text = e.target.value
                if (text.trim()) {
                    this.addTodo(text)
                }
                e.target.value = ''
            }
        },
        filters: {
            pluralize: (n, w) => n === 1 ? w : (w + 's'),
            capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
        }
    }
</script>

<style scoped>
</style>