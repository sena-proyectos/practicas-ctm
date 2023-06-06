export const ValidateIdentity = (num_documento) => {
    const identityRegex = /^\d{8,10}$/;
    const esidentidadValido = identityRegex.test(num_documento);
  
    return esidentidadValido;
  };
  
  export const ValidatePassword = (contrasena) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const esContraseñaValida = passwordRegex.test(contrasena);
  
    return esContraseñaValida;
  };