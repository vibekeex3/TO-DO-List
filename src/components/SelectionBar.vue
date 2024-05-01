<script setup>
import { defineEmits } from 'vue'

// Define the events this component can emit
const emit = defineEmits(['filter'])

// Method to emit the selected filter type
const emitFilter = (filter) => {
    emit('filter', filter);
};
</script>


<template>
    <div class="flex justify-center">
        <button @click="emitFilter('all')" 
        class="shadow shadow-violet-500/50 text-violet-600 hover:text-white 
				 hover:bg-fuchsia-500 font-bold p-2 w-26 rounded-lg mx-4 cursor-pointer">
                All Tasks</button>
        <!-- This button is for selecting all tasks -->
        <button @click="emitFilter('completed')" 
        class=" shadow shadow-violet-500/50 text-violet-600 hover:text-white 
				hover:bg-fuchsia-500 font-bold p-2 w-26 rounded-lg mx-4 cursor-pointer">
        Completed</button>
        <button @click="emitFilter('pending')"
        class=" shadow shadow-violet-500/50 text-violet-600 hover:text-white 
				hover:bg-fuchsia-500 font-bold p-2 w-26 rounded-lg mx-4 cursor-pointer">
            Pending</button>
    </div>
</template>
