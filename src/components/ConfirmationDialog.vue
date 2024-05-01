<script setup>
  import { ref, defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    isVisible: Boolean
  });
  
  const emit = defineEmits(['confirm', 'cancel']);
  
  const confirmDelete = () => {
    emit('confirm');
  };
   
  const cancelDelete = () => {
    emit('cancel');
  };
  </script>
  

<template>
    <div v-if="isVisible" class="confirmation-dialog bg-white p-4 w-4/5 text-center  text-gray-600 rounded-xl shadow-2xl border shadow-violet-500 border-violet-200">
      <p class="font-bold">Are you sure you want to delete this task?</p>
      <div class="flex justify-around">
      <button @click="confirmDelete" class="text-xs shadow shadow-violet-500
				 hover:bg-violet-200  p-1 w-2/5 rounded-md my-4 cursor-pointer">

      Yes, delete</button>
      <button @click="cancelDelete" class="text-xs shadow shadow-violet-500
				 hover:bg-violet-200  p-1 w-2/5 rounded-md my-4 cursor-pointer">No, go back</button>
        </div>
    </div>
  </template>
  
  

  <style scoped>
  .confirmation-dialog {

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
 

    z-index: 100; 
  }
  </style>