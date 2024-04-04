import { ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchAllTasks, createTask, deleteSingleTask } from '@/api/tasksApi'
import { useUserStore } from '@/stores/userStore'


export const useTasksStore = defineStore('tasks', () => {
  // State
  const tasks = ref([])

  // Getters

  // Actions
 async function fetchTasks() {
    try {
      tasks.value = await fetchAllTasks()
    } catch (error) { 
      console.error(error)
    }
  }

  async function createNewTask(task) {
    const userStore = useUserStore()
    try {
      const newTask = await createTask({
        title: task,
        user_id: userStore.user.id
      })
      tasks.value.push(newTask)
    } catch (error) {
      console.error(error)
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

  return {
    // State
    tasks,
    // Getters
    // Actions
    fetchTasks,
    createNewTask,
    deleteTask,
  }
})
