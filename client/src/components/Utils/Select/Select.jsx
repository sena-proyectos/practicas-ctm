import { useState } from 'react'
import { BiChevronRight } from 'react-icons/bi'
import { AiOutlineSearch } from 'react-icons/ai'

export const Select = ({ options, placeholder, placeholderSearch, hoverColor, hoverTextColor, py = 'py-1', rounded, border = 'border-[0.5px]', borderColor, isSearch = false, bgContainer = 'bg-white', selectedColor, textSize, shadow, name, onChange }) => {
  const [inputValue, setInputValue] = useState('')
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState('')

  const handleSelectOption = (option) => {
    if (onChange) {
      onChange(option.key)
    }
    setSelected(option.value)
    setOpen(false)
  }

  return (
    <div className='w-full max-h-7'>
      <div onClick={() => setOpen(!open)} className={`flex items-center justify-between w-full px-2 ${bgContainer} ${rounded} ${border} ${shadow} ${borderColor} ${py} select-none ${textSize} ${open ? 'mb-0' : 'mb-1'}`}>
        <input name={name} type='text' value={selected.length > 45 ? selected.substring(0, 45) + '...' : selected} readOnly placeholder={placeholder} className='w-full text-black outline-none cursor-pointer placeholder:text-slate-400' />
        <BiChevronRight className={`text-xl text-slate-600 ${open ? 'rotate-90' : 'rotate-0'} transition-all duration-500`} />
      </div>
      <ul className={`mt-1 overflow-y-auto sticky top-0 ${bgContainer} ${open && isSearch ? 'max-h-[11.8rem]' : open && !isSearch ? 'max-h-[9.4rem]' : 'hidden'} border-[0.5px] border-slate-500 rounded-md w-full px-1 z-50`}>
        {isSearch && (
          <div className={`sticky top-0 flex items-center px-2 ${bgContainer}`}>
            <AiOutlineSearch size={20} />
            <input type='text' placeholder={placeholderSearch} className='w-full p-2 font-light outline-none placeholder:text-slate-400' onChange={(e) => setInputValue(e.target.value.toLowerCase())} value={inputValue} />
          </div>
        )}
        {options.map((option) => (
          <li
            key={option.key}
            className={`px-1.5 py-1 my-1 text-sm ${hoverColor} ${hoverTextColor} rounded-md cursor-pointer select-none
             ${option.value.toLowerCase() === selected.toLowerCase() && selectedColor}
             ${option.value.toLowerCase().startsWith(inputValue) ? 'block' : 'hidden'}`}
            onClick={() => handleSelectOption(option)}
          >
            {option.value}
          </li>
        ))}
      </ul>
    </div>
  )
}
