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
    await userStore.validateEmail(registerEmail.value)
    await userStore.signUp(registerEmail.value, registerPassword.value)
    router.push({ name: 'tasks' })
  } catch (error) {
    console.error(error)
    window.alert('Error: Insert a valid email.')
  }
}

//Iniciar sesión
const signIn = async () => {
  try {
    await userStore.validateEmail(loginUser.value)
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
	<div>
		<!--inicio de sesión -->
		<div v-if="signTypeLogin">
			<h2>Log in</h2>
			<input v-model="loginUser" type="email" placeholder="Email" required/>
			<input v-model="loginPassword" type="password" placeholder="Password" required/>
			<button @click="signIn">Log in</button>

			<div class="reg">
				<p>Don't have an account?</p>
				<button @click="_changeSignType">Register</button>
			</div>

		</div>
		<!--registro de usuario -->
		<div v-else>
			<h2>Register</h2>
			<input v-model="registerUsername" type="username" placeholder="Username" required/>
			<input v-model="registerEmail" type="email" placeholder="Email" required/>
			<input v-model="registerPassword" type="password" placeholder="Password" required/>
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
