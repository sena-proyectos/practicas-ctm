import { AiOutlineUser } from 'react-icons/ai'
import { Button } from '../Button/Button'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Siderbar } from '../Siderbar/Sidebar'

import { dataInscription, idTypes, modalities } from '../../Import/staticData'

const RegisterStudent = () => {
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
    e.preventDefault()
  }
  return (
    <>
      <section className="grid grid-cols-2-20r-80">
        {/* <Siderbar /> */}
        <div className="bg-red-500"></div>
        <section className="grid grid-rows-2-25-75">
          <h1 className="text-center uppercase font-bold text-3xl place-self-center">Inscribe a un aprendiz</h1>
          <section className="h-4/5 overflow-hidden">
            <form action="" className="grid grid-rows-2 gap-y-20" onSubmit={handleSubmit}>
              <section className="grid xl:grid-cols-3 lg:grid-cols-2  w-4/5 mx-auto gap-y-4">
                {dataInscription.map((item, i) => {
                  return (
                    <div className="text-gray-400 m-auto" key={i}>
                      <label htmlFor="nombre" className="font-semibold ">
                        {item.label}
                      </label>
                      {item.type === 'number' ? (
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">{item.icon}</span>
                          <input type={item.type} name={item.name} className="py-1.5 text-base text-black bg-white border-1 border-gray-400 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900 w-72" style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }} autoComplete="on" placeholder={item.placeholder} />
                        </div>
                      ) : item.type === 'select' ? (
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">{item.icon}</span>
                          <select name={item.name} className="py-2 text-base text-black bg-white border-1 border-gray-400 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900 w-72">
                            <option value={'none'} selected disabled>
                              Sin seleccionar
                            </option>
                            {item.name === 'typeid'
                              ? idTypes.map((item, i) => {
                                  return (
                                    <option value={item.value} key={i}>
                                      {item.name}
                                    </option>
                                  )
                                })
                              : modalities.map((item, i) => {
                                  return (
                                    <option value={item.value} key={i}>
                                      {item.name}
                                    </option>
                                  )
                                })}
                          </select>
                        </div>
                      ) : (
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">{item.icon}</span>
                          <input type={item.type} name={item.name} className="py-1.5 text-base text-black bg-white border-1 border-gray-400 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900 w-72" autoComplete="on" placeholder={item.placeholder} />
                        </div>
                      )}
                    </div>
                  )
                })}
              </section>
              <section className="flex justify-between h-10 lg:flex-row sm:flex-col gap-4">
                <Button value={'Eliminar datos'} bg="bg-red-500" />
                <Button value={'Enviar'} />
              </section>
            </form>
          </section>
        </section>
      </section>
    </>
  )
}

export { RegisterStudent }
