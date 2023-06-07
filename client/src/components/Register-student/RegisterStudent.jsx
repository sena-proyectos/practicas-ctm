import axios from "axios";
import Swal from "sweetalert2";

import { Button } from "../button/button";
import {
  DataInscription,
  IdTypes,
  Modalities,
} from "../arraysInsciption/Arrays";

import {
  ValidateEmail,
  ValidateIdentity,
  ValidateInputsTypeNumber,
} from "../../validation/ExpresionesRegulares";

const RegisterStudent = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    // capturar los valores de los inputs del formulario
    const formValues = Object.fromEntries(new FormData(e.target));

    // validar que los campos no esten vacios
    const emptyFields = Object.keys(formValues).filter(
      (key) => !formValues[key]
    );

    // si hay campos vacios, mostrar alerta
    if (emptyFields.length > 0) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, completa todos los campos",
      });
    }

    // validar que los campos de tipo number sean numeros
    ValidateInputsTypeNumber(
      formValues.numero_documento_aprendiz_inscripcion,
      formValues.numero_telefono_aprendiz_inscripcion,
      formValues.numero_ficha_aprendiz_inscripcion
    );

    // validar que el numero de documento sea valido
    const {
      numero_documento_aprendiz_inscripcion,
      correo_electronico_aprendiz_inscripcion,
    } = formValues;

    const isIdentityValid = ValidateIdentity(
      numero_documento_aprendiz_inscripcion
    );

    const isEmailValid = ValidateEmail(correo_electronico_aprendiz_inscripcion);

    if (!isIdentityValid) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El número de documento no es válido",
      });
    } else if (!isEmailValid) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El correo electrónico no es válido",
      });
    }

    // enviar los datos al backend
    sendDataInscription(formValues);
  };

  // enviar los datos al backend por medio de axios
  const sendDataInscription = async (data) => {
    await axios.post("http://localhost:3000/api/create-inscription", data);
  };

  // vaciar los inputs
  const deleteData = () => {};

  return (
    <>
      <section className="grid grid-cols-2-20r-80">
        {/* <Siderbar /> */}
        <div className="bg-red-500"></div>
        <section className="grid grid-rows-2-25-75">
          <h1 className="text-center uppercase font-bold text-3xl place-self-center">
            Inscribe a un aprendiz
          </h1>
          <section className="h-4/5 overflow-hidden">
            <form
              action=""
              className="grid grid-rows-2 gap-y-20"
              onSubmit={handleSubmit}
            >
              <section className="grid xl:grid-cols-3 lg:grid-cols-2  w-4/5 mx-auto gap-y-4">
                {DataInscription.map((item, i) => {
                  return (
                    <div className="text-gray-400 m-auto" key={i}>
                      <label htmlFor="nombre" className="font-semibold ">
                        {item.label}
                      </label>
                      {item.type === "number" ? (
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            {item.icon}
                          </span>
                          <input
                            type={item.type}
                            name={item.name}
                            className="py-1.5 text-base text-black bg-white border-1 border-gray-400 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900 w-72"
                            style={{
                              WebkitAppearance: "none",
                              MozAppearance: "textfield",
                            }}
                            autoComplete="on"
                            placeholder={item.placeholder}
                          />
                        </div>
                      ) : item.type === "select" ? (
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            {item.icon}
                          </span>
                          <select
                            name={item.name}
                            className="py-2 text-base text-black bg-white border-1 border-gray-400 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900 w-72"
                          >
                            <option value={""}>Sin seleccionar</option>
                            {item.name === "tipo_documento_aprendiz_inscripcion"
                              ? IdTypes.map((item, i) => {
                                  return (
                                    <option value={item.value} key={i}>
                                      {item.name}
                                    </option>
                                  );
                                })
                              : Modalities.map((item, i) => {
                                  return (
                                    <option value={item.value} key={i}>
                                      {item.name}
                                    </option>
                                  );
                                })}
                          </select>
                        </div>
                      ) : (
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            {item.icon}
                          </span>
                          <input
                            type={item.type}
                            name={item.name}
                            className="py-1.5 text-base text-black bg-white border-1 border-gray-400 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900 w-72"
                            autoComplete="on"
                            placeholder={item.placeholder}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </section>
              <section className="flex justify-between h-10 lg:flex-row sm:flex-col gap-4">
                <Button
                  value={"Eliminar datos"}
                  bg="bg-red-500"
                  onclick={deleteData}
                />
                <Button value={"Enviar"} />
              </section>
            </form>
          </section>
        </section>
      </section>
    </>
  );
};

export { RegisterStudent };
