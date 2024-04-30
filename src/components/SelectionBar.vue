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
    <div class="flex justify-between">
        <button @click="emitFilter('all')" 
        class="border-purple-200 border shadow shadow-violet-500/50 text-violet-600 hover:text-white 
				bg-gradient-to-r hover:from-fuchsia-500 hover:via-pink-500 hover:to-orange-500 font-bold p-2 w-24 rounded-lg my-4 cursor-pointer">
                All Tasks</button>
        <!-- This button is for selecting all tasks -->
        <button @click="emitFilter('completed')" 
        class="border-purple-200 border shadow shadow-violet-500/50 text-violet-600 hover:text-white 
				bg-gradient-to-r hover:from-fuchsia-500 hover:via-pink-500 hover:to-orange-500 font-bold p-2 w-24 rounded-lg my-4 cursor-pointer">
        Completed</button>
        <button @click="emitFilter('pending')"
        class="border-purple-200 border shadow shadow-violet-500/50 text-violet-600 hover:text-white 
				bg-gradient-to-r hover:from-fuchsia-500 hover:via-pink-500 hover:to-orange-500 font-bold p-2 w-24 rounded-lg my-4 cursor-pointer">
            Pending</button>
    </div>
</template>
