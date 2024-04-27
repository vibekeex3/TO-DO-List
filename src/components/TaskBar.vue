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

// :class="{ green: editTask.is_complete, grey: !editTask.is_complete }">

</script>

<template>
  <div class="border-purple-200 border shadow shadow-violet-500/50 text-gray-600 hover:text-white 
				bg-gradient-to-r hover:from-fuchsia-500 hover:via-pink-500 hover:to-orange-500  p-2 my-2 rounded-lg  cursor-pointer"
        :class="editTask.is_complete ? 'line-through' : 'no-underline'">

    <div class="flex justify-between">

      <div class="task-info flex items-center">
        <input type="checkbox" @change="handleUpdateState" v-model="editTask.is_complete" class="mr-2"/>
       <p>{{ editTask.title }}</p> 
      </div>


      <div>
        <button @click="_openConfirmModal" class="mx-1"> <font-awesome-icon icon="fa-solid fa-lg fa-trash"
            size="lg" /></button>
        <button @click="_handleEdit" class="mx-1"><font-awesome-icon icon="fa-solid fa-pen-to-square"
            size="lg" /></button>
      </div>

    </div>


    <div v-show="_isEditing">
      <input type="text" v-model="editTask.title" 
      class="border border-violet-200 text-violet-600 rounded-md py-1 px-2 my-2 w-full"/>

      <button @click="_editTask"
      class="border border-violet-200 rounded-md py-1 px-2 my-2 w-full hover:bg-slate-900/20">Save</button>
    </div>

  </div>

  <ConfirmationDialog :isVisible="isDialogVisible" @confirm="confirmDelete" @cancel="() => isDialogVisible = false" />

</template>

<style scoped>




.input-group {
  align-items: center;
  
}





</style>
