import { Card } from "../Card/Card";
import { Siderbar } from "../Siderbar/Sidebar";
import { cards } from '../../import/staticData'
import { Footer } from '../Footer/Footer'

import { useEffect } from "react";

import Cookies from "js-cookie";

const Home = () => {
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      window.location.href = "/";
    }
  }, []);

  return (
    <main className="flex flex-row">
      <Siderbar />
      <section className="grid grid-rows-3-10-75-15 flex-auto w-min">
        <header className="grid place-items-center">
          <h1 className="text-center font-bold text-2xl">Bienvenido a practicas ctm. ¿Qué desea realizar hoy?</h1>
        </header>
        <div className="grid grid-cols-1 gap-1 p-4 sm:grid-cols-2 md:grid-cols-3 ">
          {cards.map(({ title, titleColor, description, buttonText, bgColor, link }) => {
            return <Card cardHome bgColor={bgColor} scale={'scale-90'} marginLink={'ml-auto'} titleColor={titleColor} title={title} description={description} roundedLink={'rounded-md'} buttonText={buttonText} key={title} link={link} />
          })}
        </div>

        <Footer />
      </section>
    </main>
  );
};

export { Home };
