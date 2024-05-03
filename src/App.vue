<script setup>
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/appStore'
import ConfirmationMessage from '@/components/ConfirmationMessage.vue';

const appStore = useAppStore()
const { toastNotification } = storeToRefs(appStore)

</script>

<template>
	<RouterView />
	<ConfirmationMessage v-bind="toastNotification"/>
</template>