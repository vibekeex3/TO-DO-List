<script setup>
import { useTasksStore } from '@/stores/tasksStore'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
// import EditTask from 'EditView'

const tasksStore = useTasksStore()
const { tasks } = storeToRefs(tasksStore)
const taskTitle = ref('')
//Agregamos una tarea
const _addTask = async () => {
  await tasksStore.createNewTask(taskTitle.value)
  taskTitle.value = ''
}
//Eliminamos una tarea
const _deleteTask = async (taskId) => {
  await tasksStore.deleteTask(taskId)
}
//Marcamos una tarea lista
const _isComplete = async (taskId) => {
  await tasksStore.completeTask(taskId)
}
// editamos la tarea
const _editTask = async (task) => {
  try {
    await tasksStore.updateTask(task)
    console.log('Tarea actualizada !!')
  } catch (error) {
    console.error('Error al actualizar la tarea....', error)
  }
}


const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const router = useRouter()
// Expose the signOut action for the template
const logOut = async () => {
  await userStore.signOut()
  router.push('/signin') // presssing the button redirects to the SignInView
}

onMounted(() => {
  tasksStore.fetchTasks()
})
</script>
<template>
  <section>
    <button @click="logOut">Log Out</button>

    <h1>Hello {{ user.user_metadata.username }} !</h1>

    <span>Tasks: {{ tasks.length }}</span>
    <li v-for="task in tasks" :key="task.id">
      <input type="text" v-model="task.title" />

      <button @click="_deleteTask(task.id)">Delete</button>
      <button @click="_editTask(task.id)">Edit</button>
      <button @click="_isComplete(task.id)">Done</button>
    </li>

    <div>
      <label>
        <input type="text" v-model="taskTitle" />
      </label>
      <button @click="_addTask">Add Task</button>
    </div>
  </section>

  <!-- <EditTask /> -->
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