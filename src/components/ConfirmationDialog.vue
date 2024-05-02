<script setup>
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
    <div v-if="isVisible" class=" bg-white p-6 h-36 w-11/12 sm:w-96 md:w-96 text-center  text-gray-600 rounded-xl shadow-2xl border shadow-violet-500 border-violet-200 fixed inset-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
      <p class="font-bold">Do you <em>really</em> want to delete this task?</p>
      <div class="flex justify-around">
      <button @click="confirmDelete" class="text-sm shadow shadow-violet-500
				 hover:bg-violet-500 hover:text-white  p-1 w-2/5 rounded-md my-4 cursor-pointer">

      Yes, delete</button>
      <button @click="cancelDelete" class="text-sm shadow shadow-violet-500 bg-violet-100
				 hover:bg-violet-500 hover:text-white p-2 w-2/5 rounded-md my-4 cursor-pointer">No, go back</button>
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