import { IoSearchOutline } from 'react-icons/io5'
import { Button } from '../Button/Button'
import { useRef, useEffect } from 'react'

const Search = ({ searchApprentices }) => {
  const search = useRef()
  const debounceTimeout = useRef(null)

  const handleSearch = async (e) => {
    e.preventDefault()
    const searchTerm = search.current.value

    clearTimeout(debounceTimeout.current)
    debounceTimeout.current = setTimeout(async () => {
      await searchApprentices(searchTerm)
    }, 200) // Establece el tiempo de espera deseado (en milisegundos)
  }

  useEffect(() => {
    return () => {
      clearTimeout(debounceTimeout.current)
    }
  }, [])

  return (
    <article className="w-2/4 h-9 flex items-center justify-center ">
      <form action="" method="get" className="w-full saturate-[100%] flex items-center bg-gray rounded-3xl backdrop-blur-sm">
        <input type="text" placeholder="Busca a un aprendiz" className="w-full px-5 py-1 flex-1 rounded-3xl outline-none bg-transparent" ref={search} name="nombreCompleto" autoComplete="off" onChange={handleSearch} />
        <Button bg="bg-transparent" px="px-3" textColor="text-black" className="absolute right-[6px]" value={<IoSearchOutline />} />
      </form>
    </article>
  )
}

export { Search }
