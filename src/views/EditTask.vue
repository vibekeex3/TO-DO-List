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
  <div>
    {{ editTask.title }}
    <!-- {{ editTask.description }} -->
    <!-- {{ editTask.is_complete ? 'done' : 'pending' }} -->
    <button @click="_deleteTask" class="btn-delete">Delete</button>
    <button @click="_handleEdit" class="btn-edit">Edit</button>
    <div v-show="_isEditing">
      <input type="text" v-model="editTask.title" />
      <!-- <input type="text" v-model="editTask.description" /> -->
      <input type="checkbox" v-model="editTask.is_complete" />
      <button @click="_editTask" class="btn-edit">Save</button>
    </div>
  </div>
</template>

<style scoped>
.btn-delete {
  font-size: 10px;
  border-radius: 5px;
  border: none;
  background-color: rgba(255, 174, 174, 0.394);
  color: red;
}

.btn-edit {
  font-size: 10px;
  border-radius: 5px;
  border: none;
  background-color: rgba(242, 242, 32, 0.371);
  color: rgb(94, 82, 2);
}

.btn-done {
  font-size: 10px;
  border-radius: 5px;
  border: none;
  background-color: rgba(73, 208, 5, 0.259);
  color: green;
}


</style>
