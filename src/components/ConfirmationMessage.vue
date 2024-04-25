<script setup>
import { defineProps } from 'vue';

// Accepts 'message' and 'type' as props. 
defineProps({
    message: String,
    type: String, // 'success', 'error', etc.
});
</script>

<template>
    <div v-if="message !== ''" :class="type">
        {{ message }}
    </div>
</template>

<style scoped>
div {
  position: fixed;
  bottom: 20px;
  right: 20px;

  color: white;
  padding: 12px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  z-index: 100; /* Make sure it is above other content */
}

.success {
    background-color: #4CAF50;
}

.error {
    background-color: #D8000C;
}

/* Define additional classes for other 'type' values as needed */
</style>