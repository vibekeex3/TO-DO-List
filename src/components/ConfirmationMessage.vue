<script setup>
// Accepts 'message' and 'type' as props. 
defineProps({
    message: String,
    type: String, // 'success', 'error', etc.
});
</script>

<template>
    <div v-if="message" class="fixed bottom-5 right-5 text-white py-3 px-5 rounded shadow-md z-50"
    :class="{
         'bg-gradient-to-r from-cyan-400 to-green-500': type === 'success',
         'bg-red-400': type === 'error',
    }"
    >
      <p> {{ message }}</p> 
    </div>
</template>

