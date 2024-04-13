<template>
    <div class="selection-bar">
        <button @click="emitFilter('all')" class="all-tasks">All Tasks</button>
        <!-- This button is for selecting all tasks -->
        <button @click="emitFilter('completed')" class="completed-tasks">Completed Tasks</button>
        <button @click="emitFilter('pending')" class="pending-tasks">Pending Tasks</button>
    </div>
</template>

<script setup>
import { defineEmits } from 'vue'

// Define the events this component can emit
const emit = defineEmits(['filter'])

// Method to emit the selected filter type
const emitFilter = (filter) => {
    emit('filter', filter);
};
</script>

<style scoped>
.selection-bar {
    display: flex;
    justify-content: space-around;
    padding: 5px 0 5px 0;
}

button {
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    border: none;
    border-radius: 5px;
    padding: 0.3rem;
}

button.completed-tasks {
    background-color: lightgreen;
    color: darkgreen;
}

button.pending-tasks {
    background-color: lightgrey;
}
</style>