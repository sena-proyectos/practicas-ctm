import { AiOutlineIdcard } from 'react-icons/ai';
import { BiLockAlt } from 'react-icons/bi';

import { Form } from '../Form/Form';

const User = () => {
    const loginForm = [
        { icon: <AiOutlineIdcard />, placeholder: '1017924888', type: 'text', nameInput: 'num_documento' },
        { icon: <BiLockAlt />, placeholder: '**********', type: 'password', nameInput: 'contrasena' },
    ];

    const title = {
        login: 'Bienvenido de vuelta',
    };

    return (
        <main className={`grid grid-cols-1 md:grid-cols-2-55-45 `}>
            <section className="grid grid-rows-2-30-70 h-full">
                <header className="grid place-items-center">
                    <h1 className="font-bold text-4xl mt-10">SENA</h1>
                </header>
                <div className="flex flex-col justify-self-center pt-14 mt-10">
                    <h2 className="font-bold text-xl text-center">{title.login}</h2>
                    <span className="font-light text-lg ">Es un placer para nosotros tenerte aquí</span>
                    <Form inputs={loginForm} />
                </div>
            </section>

            <section className="hidden md:bg-primary md:block">
                <div className="flex flex-col justify-center items-center h-screen">
                    <img className="h-56 w-auto" src="public/logo2.png" alt="logoSena" />
                </div>
            </section>
        </main>
    );
};

export { User };
