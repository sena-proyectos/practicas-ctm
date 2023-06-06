import { Card } from "../Card/Card";
import { Siderbar } from "../Siderbar/Sidebar";

import { useEffect } from "react";

import Cookies from "js-cookie";

const Home = () => {


  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) window.location.href = "/";

  }, []);

  const datosCards = [
    {
      title: "Listado de aprendices",
      description:
        "Podrás ver el listado de aprendices que actualmente se encuentran en prácticas.",
      isButton: true,
      buttonText: "Llevame ahí",
      bgColor: "bg-red-200",
      innerOnClick: () => {
        console.log("Hola");
      },
    },
  ];
  return (
    <main>
      <Siderbar />
      <h1>Bienvenido a proyecto sena. ¿Qué desea realizar hoy?</h1>
      <div>
        <Card
          className={datosCards.bgColor}
          title={datosCards.title}
          description={datosCards.description}
          isButton
          buttonText={datosCards.buttonText}
        />
      </div>
    </main>
  );
};

export { Home };
