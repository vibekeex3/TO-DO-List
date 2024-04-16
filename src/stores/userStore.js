import { ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchActualUser, createNewUser, logIn, logOut } from '@/api/userApi'

export const useUserStore = defineStore('user', () => {
  // State
  const user = ref(undefined)

  // Getters

  // Actions
  async function fetchUser() {
    try {
      user.value = await fetchActualUser()
    } catch (error) {
      if (error.code === '401') {
        user.value = null
        return
      }
    }
  }

  // validate of the email format is correct
  async function validateEmail(email) {
    return new Promise((resolve, reject) => {
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!validEmail.test(email)) {
        reject("Error: Insert a valid email.");
      } else {
        resolve(true);
      }
    });
  }

  
  async function signUp(username, email, password) {
    user.value = await createNewUser(username, email, password)
  }

  async function signIn(email, password) {
    try {
      user.value = await logIn(email, password)
    } catch (error) {
      console.error(error)
    }
  }

async function signOut() {

try {
  await logOut()
  user.value = null
} catch (error) {
  console.error(error)
}
}

  return {
    // State
    user,
    // Getters
    // Actions
    fetchUser,
    signUp,
    signIn,
    signOut,
    validateEmail
  }
})
