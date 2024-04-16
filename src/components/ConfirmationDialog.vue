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
  
  
  <!-- Add some basic styling -->
  <style scoped>
  .confirmation-dialog {
    /* Basic styling; adjust as necessary */
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border: 1px solid #ccc;
    padding: 20px;
    z-index: 1000; /* Ensure it's above other content */
  }
  </style>