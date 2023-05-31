export const ValidateIdentity = (identity) => {
  const identityRegex = /^\d{8,10}$/;
  const esidentidadValido = identityRegex.test(identity);

  return esidentidadValido;
};

export const ValidatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  const esContraseñaValida = passwordRegex.test(password);

  return esContraseñaValida;
};
