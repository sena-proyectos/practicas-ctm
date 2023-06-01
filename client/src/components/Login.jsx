import { useRef } from "react";
import axios from "axios";

import { ValidateIdentity, ValidatePassword } from "./validaciones";

export function Login() {
  const API_REST_URL = "http://localhost:3000/api/login";

  // Capturar valores de los inputs

  const identity = useRef(null)
  const password = useRef(null)

  // funcion que valida los campos y hace el respectivo inicio de sesión
  const saveData = async (e) => {
    e.preventDefault();

    console.log(identity, password);

    if (!identity || !password) return alert("Digite todos los campos");
    let validacionExitosa = true;

    const esidentidadValido = ValidateIdentity(identity);
    const esContraseñaValida = ValidatePassword(password);

    if (!esidentidadValido || !esContraseñaValida) {
      validacionExitosa = false;

      if (!esidentidadValido && !esContraseñaValida) {
        alert("Número de identificación y contraseña inválidos");
      } else if (!esidentidadValido) {
        alert("Número de identificación inválido");
      } else {
        alert(
          "Contraseña inválida, debe tener una mayúscula, una minúscula, un número y un mínimo de 8 caracteres."
        );
      }
    }

    if (validacionExitosa) {
      try {
        const response = await axios.post(API_REST_URL, {
          num_documento: identity,
          contrasena: password,
        });

        const { data } = response.data;
        localStorage.setItem("data", JSON.stringify(data));
        

        console.log("Inicio de sesión exitoso");

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
        <label>Número de identificación</label>
        <input
          placeholder="Número de identificación"
          type="text"
          ref={identity}
          autoComplete="off"
        />

        <label>Contraseña</label>
        <input
          placeholder="Contraseña"
          type="password"
          ref={password}
        />

        <button onClick={saveData}>Iniciar sesión</button>
      </form>
    </section>
  );
}
