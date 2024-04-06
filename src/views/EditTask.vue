<!-- <script setup>
import { useTasksStore } from '@/stores/tasksStore'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const tasksStore = useTasksStore()
const { tasks } = storeToRefs(tasksStore)
const taskTitle = ref('')

const route = useRoute()
const router = useRouter()

const actualTask = ref(null)
const newTask = ref({
    title: '',
    is_complete: false,
})

const _updateTask = async () => {
    await tasksStore.updateTask(actualTask.value.id, newTask.value)
    router.push({ name: 'tasks'})
}

onMounted(async() => {
    if (!tasks.value.length) {
        await tasksStore.fetchTasks()
    }

    const taskId = parseInt(route.params.id)
    actualTask.value = tasks.value.find( task => task.id === taskId) || {}
    newTask.value = {
        title: actualTask.value.title,
        is_complete: actualTask.value.is_complete,
    }
    })

</script> -->
<template>
    <!-- <button @click="logOut">Log Out</button> -->
    <section>
    <h1>Edit Task</h1>
<!--     
<form>

<label>
New task title
<input type="text" v-model="newTask.title" />

</label>
<button @click.prevent.stop="_updateTask">Update Task</button>

</form> -->
  </section>
</template>



<style scoped>
* {
  background-color: lightcyan;
  line-height: 2.0;
}

li input {
  border-style: none;
}
</style>