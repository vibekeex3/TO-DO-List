<script setup>
import { useTasksStore } from '@/stores/tasksStore'
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter();
const emit = defineEmits(['selectGroup']);

const selectGroup = (type) => {
  router.push({ name: 'taskGroup', params: { type } });
};

// PUT TASKS IN GROUPS
const { tasks: storeTasks } = storeToRefs(useTasksStore());

const groupedTasks = computed(() => {
  const groups = storeTasks.value.reduce((acc, task) => {
    const type = task.task_type || 'Other';
    if (!acc[type]) acc[type] = [];
    acc[type].push(task);
    return acc;
  }, {});
  return groups;
});

</script>

<template>
  <div class="p-1" v-for="(tasks, typeName) in groupedTasks" :key="typeName">
  </div>
</template>
