<script setup>
import { useTasksStore } from '@/stores/tasksStore'
import { storeToRefs } from 'pinia'
import { onMounted, ref, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import HeaderComponent from '@/components/HeaderComponent.vue'




const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const router = useRouter()
// Expose the signOut action for the template
const logOut = async () => {
  await userStore.signOut()
  router.push('/login') // presssing the button redirects to the SignInView
}



</script>

<template>
<HeaderComponent />
  <section class="text-center w-full sm:w-96 h-screen sm:h-[540px] p-6 block mx-auto mt-24
  sm:rounded-xl sm:shadow-lg sm:shadow-indigo-500/50">

	<h1 class="text-3xl font-extrabold text-gray-600 my-5 sm:my-10 sm:text-5xl">User profile</h1>
  <div class="text-left">
    <p v-if="user" class="text-xl text-gray-600 my-5 p-2 rounded-lg border border-violet-500 bg-violet-100"><span class="font-semibold">Username:</span> {{ user.user_metadata.username }}</p>
    <p v-if="user" class="text-xl text-gray-600 my-5 p-2 rounded-lg border border-violet-500 bg-violet-100">email: {{ user.email }}</p>
    <p v-if="user" class="text-xl text-gray-600 my-5 p-2 rounded-lg border border-violet-500 bg-violet-100">member since: {{ user.email_confirmed_at }}</p>
    <p v-if="user" class="text-xl text-gray-600 my-5 p-2 rounded-lg border border-violet-500 bg-violet-100">last logged in: {{ user.last_sign_in_at }}</p>
  </div>
  </section>

</template>
