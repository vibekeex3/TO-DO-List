<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
const router = useRouter()
const userStore = useUserStore()
// Variables de referencia
const signTypeLogin = ref(true)
const loginUser = ref('')
const loginPassword = ref('')
const registerUsername = ref('')
const registerEmail = ref('')
const registerPassword = ref('')
const errorMessage = ref(null)
//registrar un nuevo usuario
const register = async () => {
	try {
		errorMessage.value = null
		await userStore.signUp(registerUsername.value, registerEmail.value, registerPassword.value)
		router.push('/')
	} catch (error) {
		errorMessage.value = error.message
	}
}
//Iniciar sesión
const signIn = async () => {
	try {
		await userStore.signIn(loginUser.value, loginPassword.value)
		router.push('/')
	} catch (error) {
		console.error(error)
	}
}
const _changeSignType = () => {
	signTypeLogin.value = !signTypeLogin.value
}
</script>
<template>
	<div>
		<!--inicio de sesión -->
		<div v-if="signTypeLogin">
			<h2>Log in</h2>
			<input v-model="loginUser" type="email" placeholder="Email" />
			<input v-model="loginPassword" type="password" placeholder="Password" />
			<button @click="signIn">Log in</button>

			<div class="reg">
				<p>Don't have an account?</p>
				<button @click="_changeSignType">Register</button>
			</div>

		</div>
		<!--registro de usuario -->
		<div v-else>
			<h2>Register</h2>
			<input v-model="registerUsername" type="username" placeholder="Username" />
			<input v-model="registerEmail" type="email" placeholder="Email" />
			<input v-model="registerPassword" type="password" placeholder="Password" />
			<button @click="register">Register</button>

			<div class="log">
				<p>Already have an account?</p>
				<button @click="_changeSignType">Log In</button>
			</div>


		</div>

	</div>
</template>

<style scoped>
.reg {
	background-color: lightgray;
	margin: 30px 0;
}

.log {
	background-color: lightsteelblue;
	margin: 30px 0;
}

</style>
