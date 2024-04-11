<script setup>
import { ref } from 'vue'
import { useTasksStore } from '@/stores/tasksStore'

const tasksStore = useTasksStore()

const props = defineProps({
  task: Object
})

const _isEditing = ref(false)
const editTask = ref({ ...props.task })

const _deleteTask = async () => {
  await tasksStore.deleteTask(editTask.value.id)
}

const _handleEdit = () => {
  _isEditing.value = true
}

const _editTask = async () => {
  try {
    await tasksStore.updateTask(editTask.value)
    console.log('Tarea actualizada !!')
    _isEditing.value = false

    
  } catch (error) {
    console.error('Error al actualizar la tarea....', error)
  }
}


// COLOR CODED
const isGrey = ref(true); // Initial color of the container is grey

function toggleColor() {
  isGrey.value = !isGrey.value; // Toggle the color
}
</script>
<template>
  <div class="color-coded" @click="toggleColor" :class="{ grey: isGrey, green: !isGrey }">
    <input type="checkbox" v-model="editTask.is_complete" />
     {{ editTask.title }}
   
    <!-- {{ editTask.description }} -->
    <!-- {{ editTask.is_complete ? 'done' : 'pending' }} -->
    <button @click="_deleteTask" class="btn-delete">  <font-awesome-icon icon="fa-solid fa-trash" /></button>
 
  
    <button @click="_handleEdit" class="btn-edit"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></button>

    <div v-show="_isEditing">
      <input type="text" v-model="editTask.title" />
      <!-- <input type="text" v-model="editTask.description" /> -->
     
      <button @click="_editTask">Save</button>
    </div>
  </div>
</template>

<style scoped>

.btn-delete, .btn-edit {
  margin: 0 3px;
  border-style: none; /* This also removes the border */
}



div.color-coded {
  line-height: 2.5;
  box-sizing: border-box;
  padding-left: 0.6rem;
  margin-top: 5px;
  
  cursor: pointer; /* Indicates the element is clickable */
  border-radius: 8px;
}

div.color-coded input[type="checkbox"] {
  margin-right: 5px;
}

input {
  padding: 0.5rem;
  background-color: aqua;
  margin-bottom: 1rem;
}
.grey {
  background-color: lightgrey;
  color: black; /* Setting the text color for contrast */
}

.green {
  background-color: lightgreen;
  color: black; /* Setting the text color for contrast */
}
</style>
