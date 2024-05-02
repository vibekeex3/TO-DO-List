<script setup>
import { useTasksStore } from '@/stores/tasksStore';
import { useAppStore } from '@/stores/appStore';
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

const taskTitle = ref('')
const tasksStore = useTasksStore();
const appStore = useAppStore();

const { groupedTasks } = storeToRefs(tasksStore)

const taskCreationError = ref(''); // Holds error messages for task creation
const newTaskType = ref('');
const selectedType = ref('');
const showNewTypeInput = ref(false);

const _addTask = async () => {
  taskCreationError.value = ''; // Reset error message each time

  if (taskTitle.value.length < 4) {
    taskCreationError.value = 'Task title must be at least 4 characters long.';
    return;
  }

  try {
    await tasksStore.createNewTask({
      title: taskTitle.value,
      task_type: showNewTypeInput.value ? newTaskType.value : selectedType.value, // Ensure this is included
    });

    // Display confirmation message
    appStore.showNotification('Task added successfully!', 'success')

    // Reset fields after successful addition
    taskTitle.value = '';
    newTaskType.value = '';
    selectedType.value = '';
    showNewTypeInput.value = false;

    // Hide the confirmation message after 3 seconds
    setTimeout(() => {
      appStore.hideNotification()
    }, 3000);

  } catch (error) {
    console.error(error);
    taskCreationError.value = 'An error occurred while adding the task.';
  }
}

const _handleTypeSelected = () => {
  if (selectedType.value !== '' && selectedType.value === 'new') {
    showNewTypeInput.value = true;
  } else {
    showNewTypeInput.value = false;
  }
}
</script>


<template>

  <section
    class="text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white p-5 rounded-xl my-4 sm:my-0 mx-4 shadow-lg shadow-indigo-500/50">
    <h2 class="text-2xl font-extrabold">Add a new task</h2>
    <p class="text-sm">(minimum 3 characters)</p>
    <div>
      <label for="title"></label>
      <input v-model="taskTitle" type="text" placeholder="Title of your task (required)" id="title" required
        class="bg-transparent border border-indigo-300 hover:border-fuchsia-300 p-2 w-full rounded-lg mx-auto block my-4" />
      <input v-if="showNewTypeInput" v-model="newTaskType" placeholder="Name your list (optional)"
        class="bg-transparent font-semibold border border-indigo-300 hover:border-fuchsia-300 p-2 w-full rounded-lg mx-auto block my-4" />

      <select v-model="selectedType" @change="_handleTypeSelected"
        class="bg-white/20 border border-indigo-300 hover:border-fuchsia-300 p-2 w-full rounded-lg mx-auto block my-4">
        <option disabled value="">Please select a list</option>
        <option value="new">Create new list</option>
        <option v-for="(group, typeName) in groupedTasks" :key="typeName" :value="typeName">
          {{ typeName }}
        </option>
      </select>
      <button type="button" @click="_addTask" class="border border-violet-200  shadow-xl shadow-violet-600 w-full hover:bg-slate-900/20
				 text-lg font-bold p-3 rounded-xl mx-auto  my-2 cursor-pointer">
        Add</button>
    </div>
  </section>


</template>

