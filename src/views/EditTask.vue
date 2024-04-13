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



</script>
<template>
  <div class="color-coded" :class="{ green: editTask.is_complete, grey: !editTask.is_complete }" >



    <div class="input-group">
      <div class="task-info">
        <input type="checkbox" v-model="editTask.is_complete"   />

        {{ editTask.title }}
      </div>
      <!-- {{ editTask.description }} -->
      <!-- {{ editTask.is_complete ? 'done' : 'pending' }} -->
      <div class="task-actions">
        <button @click="_deleteTask" class="btn-delete"> <font-awesome-icon icon="fa-solid fa-lg fa-trash"
            size="lg" /></button>
        <button @click="_handleEdit" class="btn-edit"><font-awesome-icon icon="fa-solid fa-pen-to-square"
            size="lg" /></button>
      </div>
    </div>




    <div v-show="_isEditing">
      <input type="text" v-model="editTask.title" />
      <!-- <input type="text" v-model="editTask.description" /> -->

      <button class="save" @click="_editTask">Save</button>
    </div>
  </div>
</template>

<style scoped>

.btn-delete,
.btn-edit {
  margin: 0 3px;
  border-style: none;
  border-radius: 4px;
background-color: transparent;
  position: relative;
  right: 5px;
}

div.color-coded {
  line-height: 2.5;
  box-sizing: border-box;
  padding-left: 0.6rem;
  margin-top: 5px;

  cursor: pointer;
  /* Indicates the element is clickable */
  border-radius: 8px;
}

.input-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-info, .task-actions {
  display: flex;
  align-items: center;
}


div.color-coded input[type="checkbox"] {
  margin-right: 5px;
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

button.save {
  padding: 0.5rem;
  border-width: 1px;
  border-color: lightgrey;
  border-radius: 5px;
}

.grey {
  background-color: lightgrey;
  color: black;
  /* Setting the text color for contrast */
}

.green {
  background-color: lightgreen;
  color: darkgreen;

  /* Setting the text color for contrast */
}
</style>
