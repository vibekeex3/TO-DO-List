<script setup>
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const userStore = useUserStore();
const router = useRouter();

const isMenuOpen = ref(false);
const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};
const logOut = async () => {
    await userStore.signOut();
    router.push('/login');
}

</script>


<template>

    <header class="w-screen h-16 fixed top-0 left-0 bg-white shadow shadow-violet-500/50 z-50">
        <nav class="py-2 text-center relative">

            <RouterLink to="/"><img src="@/assets/images/origamee-logo.png" alt="logo origamee"
                    class="absolute top-4 left-4 max-w-32 " /></RouterLink>

            <div class="hidden sm:inline-block">
                <RouterLink to="/"
                    class="inline-block text-gray-600 duration-500 py-2 px-4 border-0 hover:bg-violet-500/30">Home
                </RouterLink>
                <RouterLink to="/about"
                    class="inline-block text-gray-600 duration-500 py-2 px-4 border-l border-r border-solid border-gray-300 hover:bg-violet-500/30 hover:font-semibold">
                    About</RouterLink>
                <button @click="logOut"
                    class=" inline-block  text-gray-600 duration-500 py-2 px-4 hover:bg-violet-500/30 hover:font-semibold">Log
                    Out</button>
            </div>

            <!-- burger button -->
            <div class="sm:hidden">
                <button @click="toggleMenu" class="absolute top-4 right-4">
                    <font-awesome-icon icon="fa-solid fa-xl fa-bars" size="xl" class="text-violet-500 text-4xl" />
                </button>
            </div>
            <!-- menú mobile -->
            <div v-if="isMenuOpen"
                class="sm:hidden rounded-md shadow-md absolute top-12 right-0 text-right bg-white text-gray-600 ">
                <ul>
                    <li
                        class="py-2 px-8 border-b border-solid border-gray-300 duration-500 hover:bg-violet-500/30 hover:font-semibold">
                        <RouterLink to="/">Home</RouterLink>
                    </li>
                    <li
                        class="py-2 px-8  border-b border-solid border-gray-300 duration-500 hover:bg-violet-500/30 hover:font-semibold">
                        <RouterLink to="/about">About</RouterLink>
                    </li>
                    <li class="py-2 px-8  duration-500 hover:bg-violet-500/30 hover:font-semibold">
                        <button @click="logOut">Log Out</button>
                    </li>
                </ul>
            </div>


        </nav>
    </header>


</template>