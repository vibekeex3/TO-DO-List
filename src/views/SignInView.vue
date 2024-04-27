<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { validateEmail, validatePassword } from '@/api/utils.js'

const router = useRouter()
const userStore = useUserStore()
// Variables de referencia
const signTypeLogin = ref(true)
const loginUser = ref('')
const loginPassword = ref('')
const registerUsername = ref('')
const registerEmail = ref('')
const registerPassword = ref('')


//registrar un nuevo usuario
const register = async () => {
	try {
		await validateEmail(registerEmail.value)
		await validatePassword(registerPassword.value)
		await userStore.signUp(registerUsername.value, registerEmail.value, registerPassword.value)
		router.push({ name: 'home' })
	} catch (error) {
		console.error(error)
		window.alert(error)
	}
}

//Iniciar sesión
const signIn = async () => {
	try {
		await validateEmail(loginUser.value)
		await userStore.signIn(loginUser.value, loginPassword.value)
		router.push({ name: 'home' })
	} catch (error) {
		console.error(error)
		window.alert('Error: Insert a valid email.')
	}
}

const _changeSignType = () => {
	signTypeLogin.value = !signTypeLogin.value
}
</script>
<template>

	<section class="text-center shadow-lg shadow-indigo-500/50 rounded-xl w-200 h-100 p-5">
		<form>
		<!--inicio de sesión -->
		<div v-if="signTypeLogin">
			<span class="text-4xl font-extrabold">
				<h1 class="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-violet-500">Welcome back</h1>
			</span>

			<input v-model="loginUser" type="email" placeholder="Email" required
				class="bg-transparent border border-indigo-300 hover:border-fuchsia-300 p-2 w-64 rounded-lg mx-auto block my-4" />
			<input v-model="loginPassword" type="password" placeholder="Password" required
				class="bg-transparent border border-indigo-300 hover:border-fuchsia-300 p-2 w-64 rounded-lg mx-auto block my-4" />

			<button type="button" @click.prevent.stop="signIn"
				class="bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 hover:from-fuchsia-500 
			hover:via-pink-500 hover:to-orange-500 text-white text-lg font-bold p-3 w-64 rounded-xl mx-auto block my-6 cursor-pointer">
				Log in</button>

			<div>
				<p class="font-bold text-gray-600">Don't have an account?</p>
				<button type="button" @click.prevent.stop="_changeSignType"
					class="border-purple-200 border shadow shadow-purple-500/50 text-purple-600 hover:text-white 
				bg-gradient-to-r hover:from-fuchsia-500 hover:via-pink-500 hover:to-orange-500 text-lg font-bold p-3 w-64 rounded-xl mx-auto block my-6 cursor-pointer">
					Register</button>
			</div>
		</div>

		<!--registro de usuario -->
		<div v-else>
			<h2 class="text-3xl font-extrabold text-violet-500">Create an account</h2>

			<input v-model="registerUsername" type="username" placeholder="Username" required
				class="bg-transparent border border-indigo-300 hover:border-fuchsia-300 p-2 w-64 rounded-lg mx-auto block my-4" />
			<input v-model="registerEmail" type="email" placeholder="Email" required
				class="bg-transparent border border-indigo-300 hover:border-fuchsia-300 p-2 w-64 rounded-lg mx-auto block my-4" />
			<input v-model="registerPassword" type="password" placeholder="Password" required
				class="bg-transparent border border-indigo-300 hover:border-fuchsia-300 p-2 w-64 rounded-lg mx-auto block my-4" />

			<button type="button" @click.prevent.stop="register"
				class="bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 hover:from-fuchsia-500 
			hover:via-pink-500 hover:to-orange-500 text-white text-lg font-bold p-3 w-64 rounded-xl mx-auto block my-6 cursor-pointer">
				Register</button>

			<div>
				<p class="text-sm font-bold text-gray-600">Already have an account?</p>
				<button type="button" @click.prevent.stop="_changeSignType"
					class="border-purple-200 border shadow shadow-purple-500/50 text-purple-600 hover:text-white 
				bg-gradient-to-r hover:from-fuchsia-500 hover:via-pink-500 hover:to-orange-500 text-lg font-bold p-3 w-64 rounded-xl mx-auto block my-6 cursor-pointer">
					Log In</button>
			</div>
		</div>
	</form>
	</section>
</template>
