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


