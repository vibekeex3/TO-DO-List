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

  <section class="text-center w-full h-screen p-0 block
   sm:w-600 sm:shadow-lg sm:shadow-indigo-500/50
   lg:w-800">
    <Header />

    <h2 class="text-3xl text-center text-gray-600 font-extrabold my-5 sm:my-10 sm:text-5xl"> Your {{
      route.params.taskType }} list</h2>


    <article class="sm:grid sm:gap-2 sm:grid-cols-2">
      <div class="mx-4 my-6 sm:my-0 sm:order-last sm:border sm:border-purple-200 sm:rounded-xl p-4 sm:mx-4">
        <SelectionBar @filter="_handleChangeFilter" />

        <p class="py-4 text-sm text-gray-600">You have {{ numTasks }} task/s in this selection:</p>

        <ul v-if="filteredTasks">
          <li v-for="task in filteredTasks" :key="task.id">
            <TaskBar :task="task" />
          </li>
        </ul>
      </div>


      <div>
        <AddingTask />
      </div>

    </article>
  </section>
</template>
