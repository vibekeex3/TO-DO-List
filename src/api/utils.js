// validate email format
export async function validateEmail(email) {
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!validEmail.test(email)) {
      throw new Error('Please insert a valid email.')
    }
  }

  // validate password format
  export async function validatePassword(password) {
    const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    if (!validPassword.test(password)) {
      throw new Error(
        'The password must contain at least 8 characters, one uppercase, one lowercase and one number.'
      )
    }
  }