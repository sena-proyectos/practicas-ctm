import { useState, useEffect } from 'react';
import { GetUsersHttp } from '../../api/httpRequest';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

import { Siderbar } from '../Siderbar/Sidebar';

export const Student = () => {
    const [apprentices, setApprentices] = useState([]);

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) window.location.href = '/';

        const getApprentices = async () => {
            const response = await GetUsersHttp();
            const { data } = response.data;

            setApprentices(data);
        };

        getApprentices();
    }, []);

    const showInfo = () => {
        Swal.fire({
            icon: 'info',
            title: '¡Información!',
            text: 'Esta funcionalidad aún no está disponible',
        });
    };

    return (
        <main className="grid grid-cols-2-20r-80">
            <Siderbar />
            <h1 className="text-lg text-black font-semibold">Aprendices</h1>

            {apprentices.map((apprentice, i) => {
                return (
                  <div className="py-8 px-8 max-w-sm w-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex  sm:space-x-6" key={i}>
                        <img className="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0" src="https://unavatar.io/axelchica759" alt="Woman's Face" />
                        <div className="text-center space-y-2 sm:text-left">
                            <div className="space-y-0.5">
                                <p className="text-lg text-black font-semibold">{` ${apprentice.nombres_aprendiz_inscripcion} ${apprentice.apellidos_aprendiz_inscripcion}`}</p>
                                <p className="text-slate-500 text-sm ">{apprentice.correo_electronico_aprendiz_inscripcion}</p>
                            </div>
                            {/* mostramos el programa de formacion y la ficha */}
                            <p className="text-gray-500 font-medium  ">{`Programa de formación: ${apprentice.programa_formacion_aprendiz_inscripcion}`}</p>
                            <p className="text-gray-500 font-medium">{`Ficha: ${apprentice.numero_ficha_aprendiz_inscripcion}`}</p>
                            <button onClick={showInfo}>Más información</button>
                        </div>
                    </div>
                );
            })}
        </main>
    );
};
