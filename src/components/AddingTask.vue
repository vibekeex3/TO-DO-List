<script setup>

import { useTasksStore } from '@/stores/tasksStore';
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia'

const taskTitle = ref('')
const tasksStore = useTasksStore();
const taskCreationError = ref(''); // Holds error messages for task creation
const newTaskType = ref('');



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

</script>


<template>

  <section class="add-task">
    <h5>Add a new task (minimum 3 characters)</h5>
    <div>
      <label for="title"></label>
      <input v-model="taskTitle" type="text" placeholder="Title" id="title" />
      <input v-model="newTaskType" placeholder="Task Group (Optional)">

      <button @click="_addTask" class="btn-add">Add</button>
    </div>
  </section>


</template>

<style>
.add-task {
margin-top: 200px;
padding: 1rem 0;
text-align: center;
background-color: lightgreen;
}

</style>