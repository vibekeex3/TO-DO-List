<script setup>
import { useTasksStore } from '@/stores/tasksStore';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

const tasksStore = useTasksStore();
const { groupedTasks } = storeToRefs(tasksStore);
const router = useRouter();

// Navigate to the task group details
const goToTaskGroup = (taskType) => {
    router.push({ name: 'taskGroup', params: { taskType } }); // 'taskType' is the typeName from your loop
};
</script>

<template>
    <!-- List of Task Groups -->
    <div class="group-card" v-for="(group, typeName) in groupedTasks" :key="typeName" @click="goToTaskGroup(typeName)">
        <h3>{{ typeName }}</h3>
        <p>Tasks in group: {{ group.tasks.length }}</p>
    </div>
</template>

<style>
.group-card {
    padding: 1rem;
    background-color: lightpink;
    /* Adjust or conditionally apply background colors as desired */
    margin-bottom: 5px;
    cursor: pointer;
}
</style>