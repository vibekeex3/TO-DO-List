<script setup>
import { useTasksStore } from '@/stores/tasksStore'
import { storeToRefs } from 'pinia'
import { onMounted, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router';




const router = useRouter();
const route = useRoute();
const { tasks } = useTasksStore();



import { defineEmits } from 'vue'
const emit = defineEmits(['selectGroup']);



const handleGroupSelection = (selectedType) => {
  filter.value = selectedType; // Assume you have a filter reactive property
};


const selectedGroup = ref(null);  // Holds the currently selected task group's name

const selectGroup = (type) => {
  router.push({ name: 'taskGroup', params: { type } });
};

// Adjusting computed property or creating a new one for filtered display
const tasksToDisplay = computed(() => {
  if (!selectedGroup.value || selectedGroup.value === 'all') {5
    return tasks.value; // or return Object.values(groupedTasks.value).flat() for all tasks
  }
  return groupedTasks.value[selectedGroup.value] || [];
});




// PUT TASKS IN GROUPS
// Alias tasks from storeToRefs to avoid conflict
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

<div class="group-card" v-for="(tasks, typeName) in groupedTasks" :key="typeName">
  <!-- <TaskGroup :type="typeName" :tasks="tasks" @selectGroup="handleGroupSelection"/> -->
  
</div>


</template>



<style>
.group-card {
padding: 1rem;
background-color: lightpink;
margin-top: 5px;
}

</style>