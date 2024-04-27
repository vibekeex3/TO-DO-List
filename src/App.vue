<template>


	<RouterView />

	<ConfirmationMessage v-bind="toastNotification"/>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import { useAppStore } from '@/stores/appStore'
import { useRouter } from 'vue-router'
import ConfirmationMessage from '@/components/ConfirmationMessage.vue';

const userStore = useUserStore()
const appStore = useAppStore()
const { toastNotification } = storeToRefs(appStore)
const { user } = storeToRefs(userStore)

const router = useRouter()
// Expose the signOut action for the template
const logOut = async () => {
  await userStore.signOut()
  router.push('/login') // presssing the button redirects to the SignInView
}

</script>



<style scoped>
header {
	line-height: 1.5;
	max-height: 100vh;
}

nav {
	width: 100%;
	font-size: 12px;
	text-align: center;
	margin-top: 2rem;
}

nav a.router-link-exact-active {
	color: var(--color-text);
}

nav a.router-link-exact-active:hover {
	background-color: transparent;
}

nav a {
	display: inline-block;
	padding: 0 1rem;
	border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
	border: 0;
}
</style>
