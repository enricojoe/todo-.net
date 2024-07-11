<template>
    <div class="flex justify-center py-5">
        <form @submit.prevent="addTodo" class="w-1/2">
            <input v-model="newTodo.name" type="text" name="todo" id="" placeholder="Add a new task" class="border-solid border-2 border-gray-500 rounded-md w-1/3 p-2.5">
            <button type="submit" class="ml-5">Tambah</button>
        </form>
    </div>
</template>

<script>

export default {
    data() {
        return {
            newTodo: {
                name: "",
                urgent: false,
                done: false
            },
        };
    },
    props: {
        BASE_URL: String
    },
    methods: {
        async addTodo() {
            try {
                const response = await fetch(this.BASE_URL + "/api/Todo", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.newTodo)
                });
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                this.newTodo.name = ""
                window.location.reload();
            } catch (error) {
                console.error('There was an error submitting the form:', error);
            }
        }
    }
}
</script>