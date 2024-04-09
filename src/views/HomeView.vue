<script setup>
import { useTasksStore } from '@/stores/tasksStore'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import EditTask from '@/views/EditTask.vue'



const tasksStore = useTasksStore()
const { tasks } = storeToRefs(tasksStore)
const title = ref('')
const taskTitle = ref('')


//Agregamos una tarea
const _addTask = async () => {
  if (taskTitle.value.length < 4) {
    return;
  }

  await tasksStore.createNewTask(taskTitle.value)
  taskTitle.value = ''
}
// //Eliminamos una tarea
// const _deleteTask = async (taskId) => {
//   await tasksStore.deleteTask(taskId)
// }
// //Marcamos una tarea lista
// const _isComplete = async (taskId) => {
//   await tasksStore.completeTask(taskId)
// }
// // editamos la tarea
// const _editTask = async (task) => {
//   try {
//     await tasksStore.updateTask(task)
//     console.log('Tarea actualizada !!')
//   } catch (error) {
//     console.error('Error al actualizar la tarea....', error)
//   }
// }


const userStore = useUserStore()
const { user } = storeToRefs(userStore)


const router = useRouter()
// Expose the signOut action for the template
const logOut = async () => {
  await userStore.signOut()
  router.push('/login') // presssing the button redirects to the SignInView
}

onMounted(() => {
  tasksStore.fetchTasks()
})
</script>
<template>
  <section>
    <button @click="logOut">Log Out</button>

    <!-- <h1>Hello {{ user.user_metadata.username }} !</h1> -->
    <span> You have {{ tasks.length }} tasks:</span>

  </section>

<section>

  <div class="container-principal">
    <div class="container-card">
    
    <div class="container-list">
      <ul class="list-task">

    
        <li v-for="(task, index) in tasks" :key="task.id" :class="{ 'color-par': index % 2 === 0 }">
          <EditTask :task="task" />
        </li>
      </ul>
    </div>
  </div>
  </div>
</section>

<section>
  <h4>Add a new task</h4>

      <div>
    <label for="title">Title:</label>
    <input v-model="taskTitle" type="text" placeholder="Title" id="title" />

    <button @click="_addTask" class="btn-add">Add</button>
  </div>

  </section>
</template>



<style scoped>
* {
  background-color: lightcyan;
  line-height: 2.0;
  color: gray;
}

li input {
  border-style: none;
}
</style>
