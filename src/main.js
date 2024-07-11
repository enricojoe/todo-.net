import { createApp } from 'vue';
import App from './App.vue';
import './assets/css/styles.css';
import { createRouter, createWebHistory } from 'vue-router'; // Add the missing imports

import Todo from '@/components/Todo.vue';
import Login from '@/components/Login.vue';

const routes = [
  { path: '/', component: Todo },
  { path: '/login', component: Login }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

createApp(App).use(router).mount('#app');
