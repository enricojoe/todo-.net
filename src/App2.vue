<template>
  <h1>Selamat Siang...</h1>
  <TodoList
    :todos="filteredTodos"
    :removeTodo="removeTodo"
    :toggleUrgent="toggleUrgent"
    :BASE_URL="this.BASE_URL"
    @update-todo-status="updateTodoStatus"
    @update-todo="updateTodo"
    class="flex flex-col items-center w-full"/>
  <AddTodo
  :BASE_URL="this.BASE_URL"
  @add-todo="addTodo"/>
  <button @click="hideCompleted = !hideCompleted">
    {{ hideCompleted ? 'Show all' : 'Hide completed' }}
  </button>
</template>

<script>
import TodoList from './components/Todo/TodoList.vue'
import AddTodo from './components/Todo/AddTodo.vue'

export default {
  name: 'App',
  components: {
    TodoList,
    AddTodo
  },
  data() {
    return {
      BASE_URL: process.env.VUE_APP_BASE_URL,
      todos: [],
      newTaskNama: '',
      newTaskUrgent: false,
      hideCompleted: false,
      token: document.cookie.split('; ').find(pair => pair.startsWith('token=')).split('=')[1]
    }
  },
  computed: {
    sortedTodos() {
      return this.todos.slice().sort((a, b) => (a.done === b.done ? 0 : a.done ? -1 : 1))
             .sort((a, b) => (a.urgent === b.urgent ? 0 : a.urgent ? -1 : 1));
      // return this.todos;
    },
    filteredTodos() {
      return this.hideCompleted
        ? this.sortedTodos.filter((t) => !t.done)
        : this.sortedTodos
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const url = this.BASE_URL+'/todo/Todo';
        const options = {
          method: 'GET', // Change to 'POST', 'PUT', etc. based on your needs
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json', // Optional, depending on your API
          }
        }
        console.log(this.token);
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        this.todos = await response.json();
        this.todos = this.sortedTodos;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    addTodo(todo) {
      this.todos.push(todo);
    },
    removeTodo(todo) {
      this.todos = this.todos.filter((t) => t !== todo)
    },
    toggleUrgent(index) {
      this.todos[index].urgent = !this.todos[index].urgent
      this.todos[index].done = false
      this.todos = this.sortedTodos;
    },
    updateTodoStatus(updatedTodo, index) {
      this.todos[index] = updatedTodo;
      this.todos = this.sortedTodos;
    },
    updateTodo(updatedTodo, index){
      this.todos[index].nama = updatedTodo.nama
      this.todos = this.sortedTodos
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
