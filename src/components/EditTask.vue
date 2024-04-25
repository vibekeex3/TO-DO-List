<script setup>
import { ref } from 'vue'
import { useTasksStore } from '@/stores/tasksStore'
import { useAppStore } from '@/stores/appStore'
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';

const tasksStore = useTasksStore()
const appStore = useAppStore()

const props = defineProps({
  task: Object
})
const _isEditing = ref(false)
const editTask = ref({ ...props.task })
const isDialogVisible = ref(false);

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

const handleUpdateState = async () => {
  try {
    await _editTask()
  } catch (error) {
    console.error('Error al actualizar la tarea....', error)
  }
}

// DELETION CONFIRMATION

const _deleteTask = async () => {
  // Logic to delete the task, possibly communicating with your backend or store
  try {
    await tasksStore.deleteTask(editTask.value.id);
    // Show confirmation message after successful deletion
    _showConfirmationMessage('Task successfully deleted!', 'success')
    console.log('tarea eliminada');

  } catch (error) {
    console.error('Error deleting task:', error);
    // Optionally, show error in the confirmation message
    _showConfirmationMessage('Error deleting task.', 'error')
  }
};

const _showConfirmationMessage = (message, messageType) => {
  console.log('_showConfirmationMessage')
  appStore.showNotification(message, messageType);
  setTimeout(() => {
    appStore.hideNotification();
  }, 3000); // Adjust time as needed
};

const _openConfirmModal = () => {
  isDialogVisible.value = true;
}

// Handle user's confirmation action from ConfirmationDialog
const confirmDelete = () => {
  isDialogVisible.value = false;
  _deleteTask();
};
</script>

<template>
  <div class="color-coded" :class="{ green: editTask.is_complete, grey: !editTask.is_complete }">

    <div class="input-group">
      <div class="task-info">
        <input type="checkbox" @change="handleUpdateState" v-model="editTask.is_complete" />

        {{ editTask.title }}
      </div>

      <div class="task-actions">
        <button @click="_openConfirmModal" class="btn-delete"> <font-awesome-icon icon="fa-solid fa-lg fa-trash"
            size="lg" /></button>
        <button @click="_handleEdit" class="btn-edit"><font-awesome-icon icon="fa-solid fa-pen-to-square"
            size="lg" /></button>
      </div>
    </div>


    <div v-show="_isEditing">
      <input type="text" v-model="editTask.title" />

      <button class="save" @click="_editTask">Save</button>
    </div>

    <ConfirmationDialog :isVisible="isDialogVisible" @confirm="confirmDelete" @cancel="() => isDialogVisible = false" />
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

.task-info,
.task-actions {
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
