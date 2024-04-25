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

  <section class="add-task">
    <h5>Add a new task (minimum 3 characters)</h5>
    <div>
      <label for="title"></label>
      <input v-model="taskTitle" type="text" placeholder="Title" id="title" />
      <input v-if="showNewTypeInput" v-model="newTaskType" placeholder="Task Group (Optional)">
      <select v-model="selectedType" @change="_handleTypeSelected">
        <option disabled value="">Please select one</option>
        <option value="new">Create new type</option>
        <option v-for="(group, typeName) in groupedTasks" :key="typeName" :value="typeName">
          {{ typeName }}
        </option>
      </select>
      <button @click="_addTask" class="btn-add">Add</button>
    </div>
  </section>


</template>

<style scoped>
.add-task {
  margin-top: 200px;
  padding: 2rem 0;
  text-align: center;
  background-color: lightgreen;
}

.error {
  color: #D8000C;
  background-color: #FFD2D2;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
}

</style>