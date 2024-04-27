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
    <div v-for="(group, typeName) in groupedTasks" :key="typeName" @click="goToTaskGroup(typeName)"
    class="border-purple-200 border shadow shadow-purple-500/50 text-purple-600 hover:text-white 
				bg-gradient-to-r hover:from-fuchsia-500 hover:via-pink-500 hover:to-orange-500 text-lg font-bold p-2 w-full rounded-lg mx-auto block my-4 cursor-pointer">
        <h3>{{ typeName }}</h3>
        <p class="text-xs">tasks: {{ group.tasks.length }}</p>
    </div>
</template>

<style>
.group-card {
 
    cursor: pointer;
}
</style>