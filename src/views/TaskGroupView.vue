<script setup>
import { useTasksStore } from '@/stores/tasksStore';
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia'

import TaskBar from '@/components/TaskBar.vue'
import SelectionBar from '@/components/SelectionBar.vue'
import AddingTask from '@/components/AddingTask.vue'
import Header from '@/components/Header.vue'

const route = useRoute();
const tasksStore = useTasksStore();
const { tasks } = storeToRefs(tasksStore)
const filter = ref('all'); // 'all', 'completed', or 'pending'

const selectedGroupType = route.params.taskType;

const filteredTasks = computed(() => {
  let groupFilteredTasks = []
  // Filter by group first
  if (selectedGroupType && selectedGroupType !== '') {
    groupFilteredTasks = tasks.value.filter(task =>
      task.task_type === selectedGroupType ||
      (!task.task_type && selectedGroupType === 'Other')
    );
  }

  // Then further filter by status
  switch (filter.value) {
    case 'completed':
      return groupFilteredTasks.filter(task => task.is_complete);
    case 'pending':
      return groupFilteredTasks.filter(task => !task.is_complete);
    case 'all': // Handle the 'all' filter option, already filtered by group so just return
    default:
      return groupFilteredTasks; // If filter is 'all', simply return all tasks (already filtered by group)
  }
});

const numTasks = computed(() => filteredTasks.value.length)

const _handleChangeFilter = (newFilter) => {
  filter.value = newFilter
}

function filterTasks(selectedFilter) {
  filter.value = selectedFilter;
}

onMounted(() => {
  tasksStore.fetchTasks()
})

</script>

<template>

<Header />

  <div class="text-center text-gray-600">
    <h2 class="text-3xl font-extrabold py-2"> Your {{ route.params.taskType }} list</h2>
  </div>

  <SelectionBar @filter="_handleChangeFilter" />

  <span> You have {{ numTasks }} task/s in this selection:</span>

  <section>
    <div>
      <ul v-if="filteredTasks">
        <li v-for="task in filteredTasks" :key="task.id">
          <TaskBar :task="task" />
        </li>
      </ul>
    </div>
  </section>

  <AddingTask />

</template>
