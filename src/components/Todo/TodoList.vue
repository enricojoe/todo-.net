<template>
    <div class="">
        <div class="container-list bg-blue-300 p-7 border-solid border-2 border-gray-400 rounded-xl">
            <h1 class="text-2xl mb-5">Today's Todo List</h1>
            <TodoItem
            v-for="(todo, index) in todos"
            :key="index"
            :index="index"
            :todo="todo"
            :BASE_URL="this.BASE_URL"
            :removeTodo="removeTodo"
            :toggleUrgent="toggleUrgent"
            @update-todo-status="updateTodoStatus"
            @update-todo="updateTodo"
            class="my-1"/>
        </div>
    </div>
</template>
  
<script>
import TodoItem from './TodoItem.vue'

export default {
    components: {
        TodoItem
    },
    props: {
        todos: {
            type: Array,
            required: true
        },
        BASE_URL: String,
        doneTodo: Function,
        removeTodo: Function,
        toggleUrgent: Function,
    },
    methods: {
        updateTodoStatus(updatedTodo, index) {
            // const updatedTodo = { ...todo, done: !todo.done, urgent: false };
            this.$emit('update-todo-status', updatedTodo, index);
        },
        updateTodo(updatedTodo, index){
            this.$emit('update-todo', updatedTodo, index);
        }
    }
}
</script>
