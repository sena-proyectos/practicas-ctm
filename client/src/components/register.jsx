import { Form, Section } from "../componentesUI/inputs";
import { CaptureValue } from "../hooks/hook";

export const Register = () => {

    const { selectRef, getSelectedValue } = CaptureValue();

    const handleSelection = () => {
        selectedValue = getSelectedValue();
        console.log(selectedValue);
    }

    const inputs 

  return (
    <>
      <h1>Register</h1>
      <form>
        {Array.map(() => {

        })}
      </form>
      <Form label={"Nombre"} type={"text"} ref={selectRef} onChange={handleSelection}/>
      <Form label={"Apellido"} type={"text"} />
      <Section
        label={"Tipo de documento"}
        placeholder={"Ejemplo: C.C"}
        option={[
          "Cédula de ciudadanía",
          "Tarjeta de identidad",
          "Cédula de extrajería",
          "Pasaporte",
        ]}
      />
      <Form label={"N° de documento"} type={"text"} />
      <Form label={"N° de celular"} type={"text"} />
      <Form label={"Correo electrónico"} type={"email"} />
      <Form label={"Contraseña"} type={"password"} />

      
    </>
  );
};
