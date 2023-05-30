export const ValidateEmail = (email) => {
  const emailRegex = /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const esCorreoValido = emailRegex.test(email);

  return esCorreoValido;
};
export const ValidatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  const esContraseñaValida = passwordRegex.test(password);

  return esContraseñaValida;
};
