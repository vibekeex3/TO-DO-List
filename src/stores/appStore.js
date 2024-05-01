import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  // State
  const toastNotification = ref({
    message: '',
    type: ''
  })

  // Actions
  function showNotification(message, type) {
    toastNotification.value.message = message
    toastNotification.value.type = type
  }

  function hideNotification() {
    toastNotification.value.message = ''
    toastNotification.value.type = ''
  }

  return {
    // State
    toastNotification,
    // Actions
    showNotification,
    hideNotification
  }
})
