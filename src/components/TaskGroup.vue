<script setup>
import { useTasksStore } from '@/stores/tasksStore';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const tasksStore = useTasksStore();
const { groupedTasks } = storeToRefs(tasksStore);
const router = useRouter();

// Navigate to the task group details
const goToTaskGroup = (taskType) => {
    router.push({ name: 'taskGroup', params: { taskType } }); // 'taskType' is the typeName from your loop
};
const hasGroups = computed(() => {
  return Object.keys(groupedTasks.value).length > 0;
});
</script>

<template> 
  <section class="sm:border sm:border-purple-200 sm:rounded-xl p-4 sm:mx-4">
   <h3 v-if="hasGroups" class="text-gray-600 text-xl font-extrabold mb-6">Or choose your list:</h3>

    <!-- List of Task Groups -->
    <div v-for="(group, typeName) in groupedTasks" :key="typeName" @click="goToTaskGroup(typeName)"
    class="border-purple-200 border shadow shadow-violet-500/50 text-gray-600 hover:text-white 
				bg-gradient-to-r hover:from-fuchsia-500 hover:via-pink-500 hover:to-orange-500  p-2 w-full rounded-lg mx-auto block my-3 cursor-pointer">
        
        <h4 class="text-lg font-bold">{{ typeName }}</h4>
        <p class="text-xs">{{ group.tasks.length }} task/s</p>
    </div>
  </section>
</template>

