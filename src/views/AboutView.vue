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
  <section class="text-center w-full h-screen p-0 block mt-24
   sm:w-200 sm:200 sm:shadow-lg sm:shadow-indigo-500/50">

	<h1 class="text-3xl font-extrabold text-gray-600 my-5 sm:my-10 sm:text-5xl">User profile</h1>
    <p class="text-xl text-gray-600 my-5 ">Username: {{ user.user_metadata.username }}</p>
    <p class="text-xl text-gray-600 my-5 ">email: {{ user.email }}</p>
    <p class="text-xl text-gray-600 my-5 ">member since: {{ user.email_confirmed_at }}</p>
    <p class="text-xl text-gray-600 my-5 ">last logged in: {{ user.last_sign_in_at }}</p>

  </section>

</template>
