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
  <section class="logout">
    <button @click="logOut">Log Out</button>
  </section>

  <section>
    <h1>Hello {{ user.user_metadata.username }} !</h1>
    <span> You have {{ tasks.length }} tasks:</span>
   

  </section>

  <section>

    <div class="container-principal">
      <div class="container-card">

        <div class="container-list">
          <ul>


            <li v-for="(task, index) in tasks" :key="task.id">
              <EditTask :task="task" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section class="add-task">
    <h5>Add a new task (minimum 3 characters)</h5>
    <div>
      <label for="title"></label>
      <input v-model="taskTitle" type="text" placeholder="Title" id="title" />

      <button @click="_addTask" class="btn-add">Add</button>
    </div>
  </section>
</template>



<style scoped>
section {
  margin-top: 1rem;
}


* {
  background-color: whitesmoke;
  line-height: 2.0;
  color: darkslategray;
}

.logout {
  display: flex;
  justify-content: flex-end;
}

button {
  border-radius: 5px;
  border-width: 1px;
  border-color: lightgray;
}

.logout button {
  background-color: lightcoral;
  color: white;
  font-weight: 600;
}

.add-task button {
  background-color:lightskyblue;
}



li input {
  border-style: none;
}


li {
  margin: 0;
  list-style-type: none;
}

ul {
  margin-left: 0;
  padding-left: 0;

}
</style>
