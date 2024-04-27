<script setup>
import { useTasksStore } from '@/stores/tasksStore'
import { storeToRefs } from 'pinia'
import { onMounted, ref, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import AddingTask from '@/components/AddingTask.vue'
import TaskGroup from '@/components/TaskGroup.vue';

const tasksStore = useTasksStore()
const { tasks } = storeToRefs(tasksStore)
const taskTitle = ref('')

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



onMounted(async () => {
  await tasksStore.fetchTasks();
});
// onMounted(() => {
//   tasksStore.fetchTasks()
// })
</script>

<template>

	<header class="line-height-relaxed max-h-screen">
	
			<nav class="w-full text-sm text-center mt-8">
				<RouterLink to="/" class="inline-block text-violet-500 py-2 px-4 border-0 hover:bg-violet-500/30">Home</RouterLink>
				<RouterLink to="/about" class="inline-block text-gray-600 py-2 px-4 border-l border-r border-solid border-gray-300 hover:bg-violet-500/30 hover:font-semibold">About</RouterLink>
				<button @click="logOut" class=" inline-block  text-gray-600 py-2 px-4 hover:bg-violet-500/30 hover:font-semibold">Log Out</button>
			</nav>

	</header>

  <section class="text-center shadow-lg shadow-indigo-500/50 rounded-xl w-200 h-100 p-5">

    <h1 class="text-3xl font-extrabold">Hello {{ user.user_metadata.username }} !</h1>

    <AddingTask />

    <TaskGroup />

  </section>

</template>


