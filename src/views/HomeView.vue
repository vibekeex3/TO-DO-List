<script setup>
import { useTasksStore } from '@/stores/tasksStore'
import { storeToRefs } from 'pinia'
import { onMounted, ref, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import AddingTask from '@/components/AddingTask.vue'
import TaskGroup from '@/components/TaskGroup.vue';
import HeaderComponent from '@/components/HeaderComponent.vue'


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

</script>

<template>
 <HeaderComponent />
  <section class="text-center w-full h-screen p-0 block mt-24
   sm:w-600 sm:h-full sm:shadow-lg sm:shadow-indigo-500/50
   lg:w-800">
    <h1 class="text-3xl font-extrabold text-gray-600 my-5 sm:my-10 sm:text-5xl">Hello {{ user ? user.user_metadata.username : ''}} !</h1>

<article class="sm: grid sm:gap-2 sm:grid-cols-2">
    <div>
    <AddingTask />
  </div>

  <div>
    <TaskGroup />
  </div>
</article>


  </section>

</template>
