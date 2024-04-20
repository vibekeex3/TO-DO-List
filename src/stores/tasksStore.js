import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  fetchAllTasks,
  createTask,
  deleteSingleTask,
  updateSingleTask,
  // addDescription
} from '@/api/tasksApi'
import { useUserStore } from '@/stores/userStore'

export const useTasksStore = defineStore('tasks', () => {
  // State
  const tasks = ref([])

  // Actions
  async function fetchTasks() {
    try {
      const data = await fetchAllTasks()
      console.log(data)
      tasks.value = data
    } catch (error) {
      console.error(error)
    }
  }

  // async function createNewTask(task) {
  //   const userStore = useUserStore()
  //   try {
  //     const newTask = await createTask({
  //       title: task,
  //       user_id: userStore.user.id
  //     })
  //     tasks.value.push(newTask)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

//new add
async function createNewTask(taskDetails) {
  const userStore = useUserStore();
  try {
    // Construct the task payload with additional details like 'type'
    const payload = {
      ...taskDetails, // Spreads the task details (title, type) into the payload
      user_id: userStore.user.id, // Adds the user_id from the user store
    };
    const newTask = await createTask(payload); // Uses the modified payload
    tasks.value.push(newTask);
  } catch (error) {
    console.error(error);
  }
}

  async function deleteTask(taskId) {
    try {
      await deleteSingleTask(taskId)
      tasks.value = tasks.value.filter((task) => taskId !== task.id)
    } catch (error) {
      console.error(error)
    }
  }

  async function updateTask(task) {
    try {
      const updatedTask = await updateSingleTask(task)

      const taskIndex = tasks.value.findIndex((t) => t.id === updatedTask.id)
      if (taskIndex !== -1) {
        tasks.value[taskIndex] = updatedTask //esto es despues de llamar a supabase
      }
    } catch (error) {
      console.error(error)
    }
  }


  return {
    // State
    tasks,
    // Actions
    fetchTasks,
    createNewTask,
    deleteTask,
    updateTask,

  }
})
