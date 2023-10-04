import { useEffect, useRef, useState } from 'react'
import { BiChevronRight } from 'react-icons/bi'
import { AiOutlineSearch, AiOutlineUserAdd } from 'react-icons/ai'
import { Button } from '../Button/Button'
import { LuSave } from 'react-icons/lu'

export const Select = ({ options, placeholder, placeholderSearch, hoverColor, hoverTextColor, py = 'py-1', rounded, border = 'border-[0.5px]', borderColor, isSearch = false, bgContainer = 'bg-white', selectedColor, textSize, shadow, name, onChange, characters, textSearch, manual = false }) => {
  const divRef = useRef(null)
  const [inputValue, setInputValue] = useState('')
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState('')
  const [addManuallyControl, setAddManuallyControl] = useState(null)

  /**
   * Función para manejar la selección de una opción.
   *
   * @function
   * @name handleSelectOption
   * @param {object} option - Opción seleccionada.
   * @param {string} option.key - Clave de la opción.
   * @param {string} option.value - Valor de la opción.
   * @returns {void}
   *
   * @example
   * const opcionSeleccionada = { key: 'clave', value: 'valor' };
   * handleSelectOption(opcionSeleccionada);
   */
  const handleSelectOption = (option) => {
    if (onChange) {
      onChange(option.key)
    }
    setSelected(option.value)
    setOpen(false)
  }

  useEffect(() => {
    setAddManuallyControl(true)
  }, [])

  const addManualUser = () => {
    setAddManuallyControl(false)
  }

  /**
   * Función que maneja el evento de hacer clic fuera de un elemento.
   *
   * Esta función se utiliza en un efecto de React para cerrar un componente
   * cuando se hace clic fuera de él.
   *
   * @param {Event} event - El objeto de evento del clic.
   * @returns {void}
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setOpen(false)
        setAddManuallyControl(true)
        setInputValue('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='w-full max-h-7' ref={divRef}>
      <div onClick={() => setOpen(!open)} className={`flex items-center justify-between w-full px-2 ${bgContainer} ${rounded} ${border} ${shadow} ${borderColor} ${py} select-none ${textSize} ${open ? 'mb-0' : 'mb-1'}`}>
        <input name={name} type='text' value={selected.length > characters ? selected.substring(0, characters) + '...' : selected} readOnly placeholder={placeholder} className='w-full text-black outline-none cursor-pointer placeholder:text-slate-400' />
        <BiChevronRight className={`text-xl text-slate-600 ${open ? 'rotate-90' : 'rotate-0'} transition-all duration-500`} />
      </div>
      <ul className={`mt-1 overflow-y-auto sticky top-0 ${bgContainer} ${open && isSearch ? 'max-h-[11.8rem]' : open && !isSearch ? 'max-h-[9.4rem]' : 'hidden'} border-[0.5px] border-slate-500 rounded-md w-full px-1 z-50`}>
        {isSearch && (
          <div className={`sticky top-0 flex items-center px-2 ${bgContainer}  ${addManuallyControl === false && 'hidden'}`}>
            <AiOutlineSearch size={20} />
            <input type='text' placeholder={placeholderSearch} className={`w-full p-2 ${textSearch} font-light outline-none placeholder:text-slate-400`} onChange={(e) => setInputValue(e.target.value.toLowerCase())} value={inputValue} />
          </div>
        )}
        {options.map((option) => (
          <li
            key={option.key}
            className={`px-1.5 py-1 my-1 text-sm ${hoverColor} ${hoverTextColor} rounded-md cursor-pointer select-none
             ${option.value.toLowerCase() === selected.toLowerCase() && selectedColor}
             ${option.value.toLowerCase().startsWith(inputValue) ? 'block' : 'hidden'} ${addManuallyControl === false && 'hidden'}`}
            onClick={() => handleSelectOption(option)}
          >
            {option.value}
          </li>
        ))}
        {manual === true && addManuallyControl === true && (
          <li className={`px-1.5 py-1 my-1 text-sm ${hoverColor} ${hoverTextColor} rounded-md cursor-pointer select-none flex gap-1 items-center font-semibold`} onClick={addManualUser}>
            <AiOutlineUserAdd size={'1.2em'} />
            Agregar manualmente
          </li>
        )}
        {addManuallyControl === false && manual === true && (
          <section className='flex flex-col gap-3 p-2'>
            <li className='text-sm font-light'>Escribe el nombre completo del instructor</li>
            <input required name='name' type='text' className='w-full p-1 text-sm font-light border-b border-b-gray-400 focus:outline-none' placeholder='Nombres' defaultValue={inputValue} />
            <input required name='lastname' type='text' className='w-full p-1 text-sm font-light border-b border-b-gray-400 focus:outline-none' placeholder='Apellidos' defaultValue={inputValue} />
            <Button bg={'bg-primary'} px={'px-3'} font={'font-medium'} textSize={'text-sm'} py={'py-1'} rounded={'rounded-xl'} shadow={'lg'} inline>
              <LuSave />
              Guardar
            </Button>
          </section>
        )}
      </ul>
    </div>
  )
}
