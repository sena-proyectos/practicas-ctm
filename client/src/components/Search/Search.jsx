import { IoSearchOutline } from 'react-icons/io5'
import { LuSettings2 } from 'react-icons/lu'
import { Button } from '../Utils/Button/Button'
import { useRef, useEffect } from 'react'

const Search = ({ searchApprentices, searchFilter = false, filter = false, iconClick }) => {
  const search = useRef()
  const debounceTimeout = useRef(null)

  const handleSearch = async (e) => {
    e.preventDefault()
    const searchTerm = search.current.value

    console.log(searchTerm)
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
    <section className={` ${searchFilter === true ? 'w-2/4' : 'w-1/5'}  flex h-9 items-center justify-center`}>
      {searchFilter && (
        <>
          <form action="" method="get" className="flex w-full items-center rounded-3xl bg-secondary/10 shadow-md saturate-[100%] backdrop-blur-sm ">
            <Button bg={'bg-transparent'} px="px-3" textColor="text-black" className="absolute right-[6px]" value={<IoSearchOutline />} />
            <input type="text" placeholder="Busca a un aprendiz" className="w-full flex-1 rounded-3xl bg-transparent px-5 py-1 outline-none" ref={search} name="nombreCompleto" autoComplete="off" onChange={handleSearch} />
          </form>
          <article className="relative right-[40px]">
            <Button bg={'bg-transparent'} px={'px-3'} textColor="text-black" clickeame={iconClick} value={<LuSettings2 />} />
          </article>
        </>
      )}
      {filter && (
        <>
          <Button
            bg={'bg-secondary/10'}
            shadow="shadow-md"
            rounded="rounded-3xl"
            px="px-5"
            textColor={'text-black'}
            clickeame={iconClick}
            value={
              <span className="flex items-center gap-5">
                <LuSettings2 />
                <span className="text-sm font-normal">Filtrar</span>
              </span>
            }
          />
        </>
      )}
    </section>
  )
}

export { Search }
