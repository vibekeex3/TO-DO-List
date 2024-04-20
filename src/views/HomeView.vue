<script setup>
import { useTasksStore } from '@/stores/tasksStore'
import { storeToRefs } from 'pinia'
import { onMounted, ref, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import EditTask from '@/views/EditTask.vue'
import SelectionBar from '@/components/SelectionBar.vue'
import TaskGroup from '@/components/TaskGroup.vue';
// import TaskGroupView from '../views/TaskGroupView.vue'; // Adjust the path as necessary
// import TaskGrouBar from '@/components/TaskGroupBar.vue';


const tasksStore = useTasksStore()
const { tasks } = storeToRefs(tasksStore)
// const title = ref('')  NO USADO
const taskTitle = ref('')






//Agregamos una tarea
// const _addTask = async () => {
//   if (taskTitle.value.length < 4) {
//     return;
//   }

//   await tasksStore.createNewTask(taskTitle.value)
//   taskTitle.value = ''
// }
const newTaskType = ref('');

const taskCreationError = ref(''); // Holds error messages for task creation

const _addTask = async () => {
  taskCreationError.value = ''; // Reset error message each time

  if (taskTitle.value.length < 4) {
    taskCreationError.value = 'Task title must be at least 4 characters long.';
    return;
  }


  await tasksStore.createNewTask({
    title: taskTitle.value,
    task_type: newTaskType.value, // Ensure this is included
    // You don't need to specify user_id here as it's added in the store function
  });
  taskTitle.value = '';
  newTaskType.value = '';
}





const userStore = useUserStore()
const { user } = storeToRefs(userStore)


const router = useRouter()
// Expose the signOut action for the template
const logOut = async () => {
  await userStore.signOut()
  router.push('/login') // presssing the button redirects to the SignInView
}


// selection bar - FILTER TASK FUNCTION

const filter = ref('all'); // 'all', 'completed', or 'pending'

// A computed property for filtering tasks based on the selected filter
const filteredTasks = computed(() => {
  switch (filter.value) {
    case 'completed':
      return tasks.value.filter(task => task.is_complete);
    case 'pending':
      return tasks.value.filter(task => !task.is_complete);
    case 'all': // Handle the 'all' filter option
    default:
      return tasks.value; // If filter is 'all', simply return all tasks
  }
});



const handleGroupSelected = (selectedGroup) => {
  console.log('Selected group:', selectedGroup);
  // Additional logic to handle the selection...
};


onMounted(async () => {
  await tasksStore.fetchTasks();
});
// onMounted(() => {
//   tasksStore.fetchTasks()
// })
</script>

<template>
  <section class="logout">
    <button @click="logOut">Log Out</button>
  </section>

  <section>
    <h1>Hello {{ user.user_metadata.username }} !</h1>
    <h4>Choose your group of tasks</h4>

      <TaskGroup @groupSelected="handleGroupSelected"/>

</section>



</template>



<style scoped>
section {
  margin-top: 1rem;
}


* {
  background-color: whitesmoke;
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


li input {
  border-style: none;
}


.add-task {
  padding-left: 0.6rem;
}


.add-task h5 {
  line-height: 2.0;
}

input[type="text"] {
  padding: 0.5rem;
  width: 270px;
  background-color: whitesmoke;
  margin: 0 5px 10px 0;
  border-radius: 5px;
  border-width: 1px;
  border-color: lightgrey;
}

.add-task button {
  background-color: lightskyblue;
  padding: 0.5rem;
}


</style>
