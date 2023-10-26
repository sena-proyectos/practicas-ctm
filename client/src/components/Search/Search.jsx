import { IoSearchOutline } from 'react-icons/io5'
import { LuSettings2 } from 'react-icons/lu'
import { Button } from '../Utils/Button/Button'
import { useRef, useEffect } from 'react'

const Search = ({ searchItem, searchFilter = false, filter = false, icon = false, iconClick, placeholder }) => {
  const search = useRef()
  const debounceTimeout = useRef(null)

  /**
   * Función para manejar la búsqueda con debounce.
   *
   * @function
   * @name handleSearch
   * @param {Event} e - Evento de búsqueda.
   * @returns {void}
   *
   * @example
   * handleSearch(event);
   */
  const handleSearch = (e) => {
    e.preventDefault()
    const searchTerm = search.current.value

    clearTimeout(debounceTimeout.current)
    debounceTimeout.current = setTimeout(() => {
      searchItem(searchTerm)
    }, 200)
  }

  /**
   * Función de evento para prevenir el comportamiento predeterminado.
   *
   * @function
   * @name evnt
   * @param {Event} e - Evento.
   * @returns {void}
   *
   * @example
   * evnt(event);
   */
  const evnt = (e) => {
    e.preventDefault()
  }

  /**
   * Efecto de limpieza para cancelar el temporizador de debounce.
   *
   * @function
   * @name cleanupEffect
   * @returns {void}
   *
   * @example
   * cleanupEffect();
   */
  useEffect(() => {
    return () => {
      clearTimeout(debounceTimeout.current)
    }
  }, [])

  return (
    <section className={` ${searchFilter === true ? 'w-2/6' : 'w-1/5'}  flex h-9 items-center justify-center`}>
      {searchFilter && (
        <>
          <search>
            <form action='' method='get' className='flex min-w-fit w-full items-center rounded-3xl bg-[#E8E8E8] shadow-md saturate-[100%] backdrop-blur-sm ' onChange={handleSearch} onSubmit={evnt}>
              <Button bg={'bg-transparent'} rounded='rounded-md' font='font-semibold' textSize='text-lg' px='px-3' textColor='text-black' className='absolute right-[6px]'>
                <IoSearchOutline />
              </Button>
              <input type='text' placeholder={placeholder} className='flex-1 py-1 pr-2 bg-transparent outline-none w-fit focus:placeholder-transparent' ref={search} name='nombreCompleto' autoComplete='off' />
              {icon && (
                <article className='absolute right-[8px] w-fit flex items-center'>
                  <Button bg={'bg-[#E8E8E8]'} px={'px-3'} textColor='text-black' onClick={iconClick}>
                    <LuSettings2 />
                  </Button>
                </article>
              )}
            </form>
          </search>
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
