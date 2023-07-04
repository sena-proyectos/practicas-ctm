import { IoSearchOutline } from 'react-icons/io5'
import { LuSettings2 } from 'react-icons/lu'
import { Button } from '../Button/Button'
import { useRef, useState, useEffect } from 'react'

const Search = ({ searchStudent, searchFilter = false, filter = false, iconClick }) => {
  const search = useRef()
  const debounceTimeout = useRef(null)

  const handleSearch = (e) => {
    e.preventDefault()
    const searchTerm = search.current.value

    clearTimeout(debounceTimeout.current)
    debounceTimeout.current = setTimeout(() => {
      searchStudent(searchTerm)
    }, 200)
  }

  const evnt = (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    return () => {
      clearTimeout(debounceTimeout.current)
    }
  }, [])

  return (


    <section className={` ${searchFilter === true ? 'w-2/4' : 'w-1/5'}  h-9 flex items-center justify-center`}>
      {searchFilter && (
        <>
          <form action="" method="get" className="w-full saturate-[100%] flex items-center bg-secondary/10 shadow-md rounded-3xl backdrop-blur-sm " onChange={handleSearch} onSubmit={evnt}>
            <Button bg={'bg-transparent'} px="px-3" textColor="text-black" className="absolute right-[6px]" value={<IoSearchOutline />} />
            <input type="text" placeholder="Busca a un aprendiz" className="w-full px-5 py-1 flex-1 rounded-3xl outline-none bg-transparent" ref={search} name="nombreCompleto" autoComplete="off"  />
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
                <span className="font-normal text-sm">Filtrar</span>
              </span>
            }
          />
        </>
      )}
    </section>
  )
}

export { Search }
