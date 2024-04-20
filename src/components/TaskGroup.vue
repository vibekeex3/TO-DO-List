<script setup>
import { computed, ref } from 'vue';
import { useTasksStore } from '@/stores/tasksStore';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

const tasksStore = useTasksStore();
const { tasks } = storeToRefs(tasksStore);
const router = useRouter();

// Group tasks by type without assigning random colors
const groupedTasks = computed(() => {
    const groups = {};
    const allTasks = tasks.value || [];

    allTasks.forEach(task => {
        const type = task.task_type || 'Other';
        if (!groups[type]) {
            groups[type] = { tasks: [] };
        }
        groups[type].tasks.push(task);
    });
    return groups;
});

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