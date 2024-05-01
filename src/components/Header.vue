<script setup>

import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'


const userStore = useUserStore()


const router = useRouter()
// Expose the signOut action for the template
const logOut = async () => {
  await userStore.signOut()
  router.push('/login') // presssing the button redirects to the SignInView
}

</script>



<template>

	<header class="my-2 max-h-screen shadow shadow-violet-500/50 mb-8">
			<nav class="w-full text-sm text-center">
				<RouterLink to="/" class="inline-block text-violet-500 duration-500 py-2 px-4 border-0 hover:bg-violet-500/30">Home</RouterLink>
				<RouterLink to="/about" class="inline-block text-gray-600 duration-500 py-2 px-4 border-l border-r border-solid border-gray-300 hover:bg-violet-500/30 hover:font-semibold">About</RouterLink>
				<button @click="logOut" class=" inline-block  text-gray-600 duration-500 py-2 px-4 hover:bg-violet-500/30 hover:font-semibold">Log Out</button>
			</nav>
	</header>


</template>