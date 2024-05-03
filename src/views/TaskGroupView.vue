<script setup>
import { useTasksStore } from '@/stores/tasksStore';
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia'

import TaskBar from '@/components/TaskBar.vue'
import SelectionBar from '@/components/SelectionBar.vue'
import AddingTask from '@/components/AddingTask.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'

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

onMounted(() => {
  tasksStore.fetchTasks()
})

</script>

<template>
  <HeaderComponent />
  <section class="text-center w-full h-screen p-0 block mt-24 relative
   sm:w-600 sm:shadow-lg sm:shadow-indigo-500/50
   lg:w-800">

    <RouterLink to="/"
      class="hidden sm:inline-block sm:absolute sm:left-4 sm:top-12 sm:text-lg sm:text-violet-500 sm:border sm:border-violet-500 sm:rounded-lg sm:py-2 sm:px-4  sm:hover:bg-violet-500 sm:hover:text-white">
      < Back </RouterLink>
        <RouterLink to="/"
          class="sm:hidden inline-block absolute left-4 top-5 text-lg text-violet-500 border border-violet-500 rounded-lg py-2 px-4  hover:bg-violet-500 hover:text-white">
          < </RouterLink>

            <h2 class="inline-block text-3xl text-center text-gray-600 font-extrabold my-5 sm:my-10 sm:text-5xl"> Your
              <span class="text-violet-500"> {{
                route.params.taskType }} </span> list</h2>

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
