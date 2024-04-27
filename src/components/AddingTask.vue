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
    class="text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white p-5 rounded-xl my-4 mx-auto">
    <h3 class="text-xl font-extrabold">Add a new task</h3>
    <p class="text-xs">(minimum 3 characters)</p>
    <div>
      <label for="title"></label>
      <input v-model="taskTitle" type="text" placeholder="Title (required)" id="title" required
        class="bg-transparent border border-indigo-300 hover:border-fuchsia-300 p-2 w-64 rounded-lg mx-auto block my-4" />
      <input v-if="showNewTypeInput" v-model="newTaskType" placeholder="Task Group (optional)"
        class="bg-transparent border border-indigo-300 hover:border-fuchsia-300 p-2 w-64 rounded-lg mx-auto block my-4" />

      <select v-model="selectedType" @change="_handleTypeSelected"
        class="bg-transparent border border-indigo-300 hover:border-fuchsia-300 p-2 w-64 rounded-lg mx-auto block my-4">
        <option disabled value="">Please select one</option>
        <option value="new">Create new type</option>
        <option v-for="(group, typeName) in groupedTasks" :key="typeName" :value="typeName">
          {{ typeName }}
        </option>
      </select>
      <button type="button" @click="_addTask" class="border border-violet-200  shadow-xl shadow-violet-600 w-64 hover:bg-slate-900/20
				 text-lg font-bold p-3 rounded-xl mx-auto  my-2 cursor-pointer">
        Add</button>
    </div>
  </section>


</template>

