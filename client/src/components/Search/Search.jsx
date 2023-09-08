import { IoSearchOutline } from 'react-icons/io5'
import { LuSettings2 } from 'react-icons/lu'
import { Button } from '../Utils/Button/Button'
import { useRef, useEffect } from 'react'

const Search = ({ searchStudent, searchFilter = false, filter = false, icon = false, iconClick, placeholder }) => {
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
    <section className={` ${searchFilter === true ? 'w-[22rem]' : 'w-1/5'}  flex h-9 items-center justify-center`}>
      {searchFilter && (
        <>
          <form action='' method='get' className='flex min-w-fit w-full items-center rounded-3xl bg-[#E8E8E8] shadow-md saturate-[100%] backdrop-blur-sm ' onChange={handleSearch} onSubmit={evnt}>
            <Button bg={'bg-transparent'} rounded='rounded-md' font='font-semibold' textSize='text-lg' px='px-3' textColor='text-black' className='absolute right-[6px]'>
              <IoSearchOutline />
            </Button>
            <input type='text' placeholder={placeholder} className='flex-1 py-1 bg-transparent outline-none w-fit rounded-3xl focus:placeholder-transparent' ref={search} name='nombreCompleto' autoComplete='off' />
            {icon && (
              <article className='absolute right-[8px] w-fit flex items-center'>
                <Button bg={'bg-transparent'} px={'px-3'} textColor='text-black' onClick={iconClick}>
                  <LuSettings2 />
                </Button>
              </article>
            )}
          </form>
        </>
      )}
      {filter && (
        <>
          <Button bg={'bg-[#E8E8E8]'} font='font-semibold' textSize='text-lg' py='py-1.5' shadow='shadow-md' rounded='rounded-3xl' px='px-5' textColor={'text-black'} onClick={iconClick}>
            <span className='flex items-center gap-5'>
              <LuSettings2 />
              <span className='text-sm font-normal'>Filtrar</span>
            </span>
          </Button>
        </>
      )}
    </section>
  )
}

export { Search }
