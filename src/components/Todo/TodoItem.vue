<template>
    <div 
    :class="{'bg-red-500': todo.urgent, 'bg-gray-500': !todo.urgent}" 
    class="bg-gray-100 w-96 rounded-lg flex justify-between p-2.5">
        <div>
            <input 
            type="checkbox" 
            :checked="todoStatus" 
            @change="UpdateTodoItem(this.updateTodo.id, this.updateTodo, 'done')" class="mr-2">
            <span v-if="edit" @click="UpdateTodoItem(this.updateTodo.id, this.updateTodo, 'urgent')" :class="{'line-through': todo.done}">{{ todo.name }}</span>
            <input v-else v-model="updateTodo.name" type="text" name="" id="" :placeholder="updateTodo.name">
        </div>
        <div v-if="edit" id="menu">
            <span @click="removeTodoItem" class="mr-2">X</span>
            <span @click="updateEdit">E</span>
        </div>
        <button v-else @click="UpdateTodoItem(this.updateTodo.id, this.updateTodo)">Update</button>
    </div>
</template>
  
<script>
    export default {
        data() {
            return {
                updateTodo: this.todo,
                edit: true,
                todoStatus: this.todo.done
            }
        },
        props: {
            todo: {
                type: Object,
                required: true
            },
            index: {
                type: Number,
                required: true,
            },
            BASE_URL: String,
            removeTodo: Function,
            toggleUrgent: Function
        },
        computed: {
            token() {
                const cookiePair = document.cookie.split('; ').find(pair => pair.startsWith('token='));
                return cookiePair ? cookiePair.split('=')[1] : null;
            }
        },
        methods: {
            async UpdateTodoItem(id, todo, task="none") {
                try {
                    if (task === "urgent"){
                        todo.urgent = !todo.urgent
                    } else if (task === "done") {
                        todo.done = !todo.done
                        if (todo.urgent === true) {
                            todo.urgent = false
                        }
                    }

                    const response = await fetch(this.BASE_URL + "/todo/Todo/" + id, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${this.token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(todo)
                    });
                    
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    
                    window.location.reload();
                } catch (error) {
                    console.error('There was an error submitting the form:', error);
                }
            },
            removeTodoItem() {
                this.$props.removeTodo(this.todo);
            },
            
            toggleTodoDone(todo, index) {
                const updatedTodo = { ...todo, done: !todo.done, urgent: false };
                this.$emit('update-todo-status', updatedTodo, index);
            },
            updateEdit() {
                this.edit = !this.edit;
            }
        }
    }
</script>
