import Swal from "sweetalert2";

export const ValidateIdentity = (numero_documento_aprendiz_inscripcion) => {
  const identityRegex = /^\d{8,10}$/;
  identityRegex.test(numero_documento_aprendiz_inscripcion);

  
};

export const ValidateEmail = (correo_electronico_aprendiz_inscripcion) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailRegex.test(correo_electronico_aprendiz_inscripcion);

  return Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "¡El correo electrónico no es válido!",
  });
};

export const ValidateInputs = (
  nombres_aprendiz_inscripcion,
  apellidos_aprendiz_inscripcion,
  tipo_documento_aprendiz_inscripcion,
  numero_documento_aprendiz_inscripcion,
  correo_electronico_aprendiz_inscripcion,
  numero_telefono_aprendiz_inscripcion,
  numero_ficha_aprendiz_inscripcion,
  programa_formacion_aprendiz_inscripcion,
  tipo_modalidad_aprendiz_inscripcion,
  inicio_etapa_practica_aprendiz_inscripcion,
  fin_etapa_practica_aprendiz_inscripcion
) => {
  // validamos que no haya ningun campo vacío
  if (
    nombres_aprendiz_inscripcion === "" ||
    apellidos_aprendiz_inscripcion === "" ||
    tipo_documento_aprendiz_inscripcion === "" ||
    numero_documento_aprendiz_inscripcion === "" ||
    correo_electronico_aprendiz_inscripcion === "" ||
    numero_telefono_aprendiz_inscripcion === "" ||
    numero_ficha_aprendiz_inscripcion === "" ||
    programa_formacion_aprendiz_inscripcion === "" ||
    tipo_modalidad_aprendiz_inscripcion === "" ||
    inicio_etapa_practica_aprendiz_inscripcion === "" ||
    fin_etapa_practica_aprendiz_inscripcion === ""
  ) {
    return Swal.fire({
      title: "¡Error!",
      text: "Por favor, ingrese todos los campos",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  }
};
