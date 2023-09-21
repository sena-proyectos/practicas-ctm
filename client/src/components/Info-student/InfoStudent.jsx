import { Footer } from '../Footer/Footer'
import { Siderbar } from '../Siderbar/Sidebar'

export const InfoStudent = () => {
  return (
    <main className='flex flex-row min-h-screen bg-whitesmoke'>
      <Siderbar />
      <section className='relative grid flex-auto w-min grid-rows-3-10-75-15'>
        <header className='grid place-items-center'>
          <h1 className='text-2xl font-bold border-b-2 border-coffee'>Eyson Quiceno Giraldo</h1>
        </header>
        <section className='flex flex-col items-center gap-4 px-6 md:justify-center'>
          <section className='grid w-full bg-white shadow-lg md:w-1/2 border-t-1 grid-rows-2-20-80 rounded-xl'>
            <header className='flex items-center justify-center h-full pt-4'>
              <h2 className='text-lg font-medium'>Info. Personal</h2>
            </header>
            <section className='flex flex-col justify-center px-3 py-3'>
              <div className='grid grid-cols-2-40-60'>
                <h3 className='font-medium'>Email:</h3>
                <p>eysonquiceno@gmail.com</p>
              </div>
              <div className='grid grid-cols-2-40-60'>
                <p className='font-medium'>No. Documento:</p>
                <p>1093229059</p>
              </div>
              <div className='grid grid-cols-2-40-60'>
                <p className='font-medium'>Contacto:</p>
                <p>3135189268</p>
              </div>
            </section>
          </section>
          <section className='grid flex-col w-full gap-4 md:grid-cols-2 '>
            <section className='grid w-full bg-white shadow-lg border-t-1 grid-rows-2-20-80 rounded-xl'>
              <header className='flex items-center justify-center h-full'>
                <h2 className='text-lg font-medium'>Info. Acádemica</h2>
              </header>
              <section className='flex flex-col px-3 pb-7'>
                <div className='grid grid-cols-2-40-60'>
                  <p className='font-medium'>Programa:</p>
                  <p>Análisis y Desarrollo de Software</p>
                </div>
                <div className='grid grid-cols-2-40-60'>
                  <p className='font-medium'>Ficha:</p>
                  <p>2473196</p>
                </div>
                <div className='grid grid-cols-2-40-60'>
                  <p className='font-medium'>Nivel académico:</p>
                  <p>Tecnologo</p>
                </div>
                <div className='grid grid-cols-2-40-60'>
                  <p className='font-medium'>Etapa:</p>
                  <p>Prácticas</p>
                </div>
                <div className='grid grid-cols-2-40-60'>
                  <p className='font-medium'>Modalidad:</p>
                  <p>Vinculación laboral</p>
                </div>
                <div className='grid grid-cols-2-40-60'>
                  <p className='font-medium'>Fin lectiva:</p>
                  <p>2023-02-10</p>
                </div>
                <div className='grid grid-cols-2-40-60'>
                  <p className='font-medium'>Inicio prácticas:</p>
                  <p>2023-04-01</p>
                </div>
              </section>
            </section>
            <section className='grid w-full bg-white shadow-lg border-t-1 grid-rows-2-20-80 rounded-xl'>
              <header className='flex items-center justify-center h-full'>
                <h2 className='text-lg font-medium'>Info. Laboral</h2>
              </header>
              <section className='flex flex-col px-3 pb-3'>
                <div className='grid grid-cols-2-40-60'>
                  <p className='font-medium'>Empresa:</p>
                  <p>Telepermance</p>
                </div>
                <div className='grid grid-cols-2-40-60'>
                  <p className='font-medium'>Jefe Inmediato:</p>
                  <p>Alejandra Quecam</p>
                </div>
                <div className='grid grid-cols-2-40-60'>
                  <p className='font-medium'>Cargo:</p>
                  <p>TAM</p>
                </div>
                <div className='grid grid-cols-2-40-60'>
                  <p className='font-medium'>Email:</p>
                  <p>rousy@teleperformance.co</p>
                </div>
                <div className='grid grid-cols-2-40-60'>
                  <p className='font-medium'>Contacto:</p>
                  <p>302124145</p>
                </div>
                <div className='grid grid-cols-2-40-60'>
                  <p className='font-medium'>ARL:</p>
                  <p>Empresa </p>
                </div>
              </section>
            </section>
          </section>
        </section>
        <Footer />
      </section>
    </main>
  )
}
