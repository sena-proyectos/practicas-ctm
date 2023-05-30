import { useState } from "react";
import axios from "axios";

import { ValidateEmail, ValidatePassword } from "./validaciones";

export function Form() {
  const API_REST_URL = "https://reqres.in/api/login";

  // Capturar valores de los inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePass = (event) => {
    setPassword(event.target.value);
  };

  // funcion que valida los campos y hace el respectivo inicio de sesión
  const saveData = async (e) => {
    e.preventDefault();

    if (!email || !password) return alert("Digite todos los campos");
    let validacionExitosa = true;

    const esCorreoValido = ValidateEmail(email);
    const esContraseñaValida = ValidatePassword(password);

    if (!esCorreoValido || !esContraseñaValida) {
      validacionExitosa = false;

      if (!esCorreoValido && !esContraseñaValida) {
        alert("Correo y contraseña inválidos");
      } else if (!esCorreoValido) {
        alert("Correo electrónico inválido");
      } else {
        alert(
          "Contraseña inválida, debe tener una mayúscula, una minúscula, un número y un mínimo de 8 caracteres."
        );
      }
    }

    if (validacionExitosa) {
      try {
        const response = await axios.post(API_REST_URL, {
          email,
          password,
        });

        const { token } = response.data

        localStorage.setItem('token', token);
        console.log('Inicio de sesión exitoso');

        console.log(response.data);
        // Realiza cualquier acción adicional después de iniciar sesión correctamente
      } catch (error) {
        console.error(error);
        // Realiza cualquier acción adicional en caso de error de inicio de sesión
      }
    }
  };

  return (
    <section>
      <form>
        <label>Correo</label>
        <input
          placeholder="Ingresa tu correo"
          type="email"
          value={email}
          onChange={handleChange}
          autoComplete="off"
        />

        <label>Contraseña</label>
        <input
          placeholder="Ingresa tu contraseña"
          type="password"
          value={password}
          onChange={handleChangePass}
        />

        <button onClick={saveData}>Iniciar sesión</button>
      </form>
    </section>
  );
}
