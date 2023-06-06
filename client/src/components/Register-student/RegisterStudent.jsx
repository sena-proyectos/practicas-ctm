import { AiOutlineUser } from "react-icons/ai";
import { Button } from "../button/button";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Siderbar } from "../Siderbar/Sidebar";

const RegisterStudent = () => {
  const dataInscription = [
    {
      icon: <AiOutlineUser />,
      type: "text",
      name: "nombres_aprendiz_inscripcion",
      placeholder: "Alejandro",
      label: "Nombres",
    },
    {
      icon: <AiOutlineUser />,
      type: "text",
      name: "apellidos_aprendiz_inscripcion",
      placeholder: "Rodriguez",
      label: "Apellidos",
    },
    {
      icon: <AiOutlineUser />,
      type: "select",
      name: "tipo_documento_aprendiz_inscripcion",
      placeholder: "sin seleccionar",
      label: "Tipo documento",
    },
    {
      icon: <AiOutlineUser />,
      type: "number",
      name: "numero_documento_aprendiz_inscripcion",
      placeholder: "1023456789",
      label: "Número documento",
    },
    {
      icon: <AiOutlineUser />,
      type: "email",
      name: "correo_electronico_aprendiz_inscripcion",
      placeholder: "example@sena.edu.co",
      label: "Correo electrónico",
    },
    {
      icon: <AiOutlineUser />,
      type: "number",
      name: "numero_telefono_aprendiz_inscripcion",
      placeholder: "3012345467",
      label: "Número de celular",
    },
    {
      icon: <AiOutlineUser />,
      type: "number",
      name: "numero_ficha_aprendiz_inscripcion",
      placeholder: "2134567",
      label: "Número de ficha",
    },
    {
      icon: <AiOutlineUser />,
      type: "text",
      name: "programa_formacion_aprendiz_inscripcion",
      placeholder: "ADSO",
      label: "Programa de formación",
    },
    {
      icon: <AiOutlineUser />,
      type: "select",
      name: "tipo_modalidad_aprendiz_inscripcion",
      placeholder: "Sin seleccionar",
      label: "Modalidad",
    },
    {
      icon: <AiOutlineUser />,
      type: "date",
      name: "inicio_etapa_practica_aprendiz_inscripcion",
      label: "Fecha de inicio prácticas",
    },
    {
      icon: <AiOutlineUser />,
      type: "date",
      name: "fin_etapa_practica_aprendiz_inscripcion",
      label: "Fecha de fin prácticas",
    },
  ];
  const idTypes = [
    { value: "C.C", name: "Cédula de ciudadanía" },
    { value: "C.E", name: "Cédula de extranjería" },
    { value: "T.I", name: "Tarjeta de identidad" },
  ];

  const modalities = [
    { value: "Contrato de aprendizaje", name: "Contrato de aprendizaje" },
    { value: "Pasantias", name: "Pasantías" },
    { value: "Proyecto formativo", name: "Proyecto formativo" },
  ];

  /* const [modalities, setModalities] = useState([{}])
  useEffect(() => {
    const getModalities = () => {
      axios
        .get('http://localhost:3000/api/practical-stages')
        .then((response) => {
          setModalities(response.data)
        })
        .catch((error) => {
          throw new Error(error)
        })
    }
    getModa lities()
  }, [])*/


  const handleSubmit = (e) => {
    e.preventDefault();

    // capturar valores de todos los inputs del formulario y guardarlos en una constante y mostarlos en consola
    const formValues = Object.fromEntries(new FormData(e.target));

    // enviar los datos al backend digitados
    sendDataInscription(formValues);
  };

  // enviar los datos al backend por medio de axios
  const sendDataInscription = async (data) => {
    const response = await axios.post(
      "http://localhost:3000/api/create-inscription",
      data
    );
  };

  // vaciar los inputs 
  const deleteData = () => {
    
  };
  

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
                {dataInscription.map((item, i) => {
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
                            <option value={"none"}>Sin seleccionar</option>
                            {item.name === "typeid"
                              ? idTypes.map((item, i) => {
                                  return (
                                    <option value={item.value} key={i}>
                                      {item.name}
                                    </option>
                                  );
                                })
                              : modalities.map((item, i) => {
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
