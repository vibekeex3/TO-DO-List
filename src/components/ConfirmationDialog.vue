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
    <div v-if="isVisible" class="confirmation-dialog">
      <p>Are you sure you want to delete this task?</p>
      <button @click="confirmDelete">Yes, delete</button>
      <button @click="cancelDelete">No, go back</button>
    </div>
  </template>
  
  

  <style scoped>
  .confirmation-dialog {

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border: 1px solid #ccc;
    padding: 20px;
    z-index: 100; 
  }
  </style>