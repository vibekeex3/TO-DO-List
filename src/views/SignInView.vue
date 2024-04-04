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
const registerEmail = ref('')
const registerPassword = ref('')
const errorMessage = ref(null)
//registrar un nuevo usuario
const register = async () => {
  try {
    errorMessage.value = null
    await userStore.signUp(registerEmail.value, registerPassword.value)
    router.push({ name: 'tasks' })
  } catch (error) {
    errorMessage.value = error.message
  }
}
//Iniciar sesión
const signIn = async () => {
  try {
    await userStore.signIn(loginUser.value, loginPassword.value)
    router.push({ name: 'tasks' })
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
      <input v-model="loginUser" type="email" placeholder="Correo electrónico" />
      <input v-model="loginPassword" type="password" placeholder="Contraseña" />
      <button @click="signIn">log in</button>
    </div>
    <!--registro de usuario -->
    <div v-else>
      <h2>Register</h2>
      <input v-model="registerEmail" type="email" placeholder="Correo electrónico" />
      <input v-model="registerPassword" type="password" placeholder="Contraseña" />
      <button @click="register">Registrar</button>
    </div>
    <button @click="_changeSignType">Register</button>
  </div>
</template>
<style scoped></style>












