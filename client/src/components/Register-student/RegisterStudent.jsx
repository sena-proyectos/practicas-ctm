import { AiOutlineUser } from 'react-icons/ai'
import { Form } from '../Form/Form'

const RegisterStudent = () => {
  const dataInscription = [{ icon: <AiOutlineUser />, type: 'text', name: 'name', placeholder: 'Nombre' }]
  return (
    <>
      <section className='grid grid-cols-2-20r-80'>
        <aside className=' bg-red-400 h-screen' />
        <section className='pt-8'>
          <h1 className='text-center uppercase font-bold text-3xl'>Inscribe a un aprendiz</h1>
          <section className='pt-6'>
            <Form inputs={dataInscription} />
          </section>
        </section>
      </section>
    </>
  )
}

export { RegisterStudent }
