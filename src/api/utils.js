export async function validateEmail(email) {
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!validEmail.test(email)) {
      throw new Error('Por favor ingrese un correo electrónico válido.')
    }
  }
  export async function validatePassword(password) {
    const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    if (!validPassword.test(password)) {
      throw new Error(
        'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.'
      )
    }
  }