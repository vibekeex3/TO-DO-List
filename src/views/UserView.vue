<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import HeaderComponent from '@/components/HeaderComponent.vue'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
</script>

<template>
<HeaderComponent />

  <section class="text-center text-gray-600 w-full sm:w-96 h-screen sm:h-[540px] p-6 block mx-auto mt-24
  sm:rounded-xl sm:shadow-lg sm:shadow-indigo-500/50">

	<h1 class="text-3xl font-extrabold my-5 sm:my-10 sm:text-5xl">User profile</h1>
  <div class="text-left text-lg ">
    <p v-if="user" class=" my-5 p-2 rounded-lg border border-violet-500 bg-violet-100"><span class="font-semibold">Username: </span> {{ user.user_metadata.username }} </p>
    <p v-if="user" class=" my-5 p-2 rounded-lg border border-violet-500 bg-violet-100"><span class="font-semibold">email: </span> {{ user.email }}</p>
    <p v-if="user" class=" my-5 p-2 rounded-lg border border-violet-500 bg-violet-100"><span class="font-semibold">member since: </span> {{ $dayjs(user.email_confirmed_at).format('DD-MM-YYYY') }}</p>
    <p v-if="user" class=" my-5 p-2 rounded-lg border border-violet-500 bg-violet-100"><span class="font-semibold">last logged in: </span> {{ $dayjs(user.last_sign_in_at).format('DD-MM-YYYY') }}</p>
  </div>
  </section>
</template>
