import { IoSearchOutline } from 'react-icons/io5'
import { Button } from '../Button/Button'
import { useRef, useState, useEffect } from 'react'

const Search = ({ searchStudent }) => {
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
    <article className="w-2/4 h-9 flex items-center justify-center ">
      <form action="" method="get" className="w-full saturate-[100%] flex items-center bg-gray rounded-3xl backdrop-blur-sm" onChange={handleSearch} onSubmit={evnt}>
        <input type="text" placeholder="Busca a un aprendiz" className="w-full px-5 py-1 flex-1 rounded-3xl outline-none bg-transparent" ref={search} autoComplete="off" />
        <Button type="submit" bg="bg-transparent" px="px-3" textColor="text-black" className="absolute right-[6px]" value={<IoSearchOutline />} />
      </form>
    </article>
  )
}

export { Search }
