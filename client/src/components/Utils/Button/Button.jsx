import { Fragment } from 'react'
import LoadingUI from 'react-loading'

export const Button = ({ bg = 'bg-primary', px = 'px-3', py = 'py-2', textColor = 'text-white', rounded = 'rounded-lg ', shadow = 'shadow-none', onClick = () => {}, font = 'font-semibold', textSize = 'text-lg', hover = false, isDisabled = false, type = 'submit', hoverConfig = '', classNames = '', children = <></>, inline = false, name = '', isLoading = false }) => {
  const hoverConfigText = `hover:${hoverConfig}`
  return isLoading === false ? (
    <button name='' type={type} disabled={isDisabled} className={`${isDisabled ? 'bg-slate-400' : bg} ${rounded} ${px} shadow-${shadow} shadow-current ${py} mx-auto ${textColor} ${textSize} ${font} ${hover && `transition-colors ${hoverConfigText}`} ${inline && 'flex items-center gap-1'} ${classNames}`} onClick={onClick}>
      {children}
    </button>
  ) : (
    <button type='button' disabled className={`${rounded} ${bg} ${px} shadow-${shadow} shadow-current ${py} mx-auto ${textColor} ${textSize} ${font}  ${hover && `transition-colors ${hoverConfigText}`} ${inline && 'flex items-center gap-1'} ${classNames}`}>
      <LoadingUI className='mx-[3px]' width={25} height={25} type='spin' /> Cargando
    </button>
  )
}

const colors = {
  blue: 'blue-500',
  red: 'red-500',
  green: 'green-500',
  yellow: 'yellow-500',
  gray: 'gray-500'
}

export const UIButton = ({ children = <Fragment />, bgColor = colors.green, hoverColor = colors.green, textColor = 'white', fontWeight = 'text-base', classNames = '', rounded = 'rounded-lg', type = 'submit' }) => {
  switch (type) {
    case 'submit':
      return (
        <button className={`bg-${colors[bgColor] ?? bgColor} text-${textColor} ${rounded} ${fontWeight} hover:bg-${bgColor} px-3 py-2 w-fit flex justify-center ${classNames}`} type='submit'>
          {children}
        </button>
      )
    case 'loading':
      return (
        <button className={`bg-${bgColor} flex gap-1 items-center text-${textColor} ${rounded} ${fontWeight} px-3 py-2 w-fit flex justify-center ${classNames}`} type='button' disabled>
          Cargando <LoadingUI className='mx-[3px]' width={20} height={20} type='spin' />
        </button>
      )
    case 'disabled':
      return (
        <button className={`bg-${bgColor} disabled:opacity-50 disabled:cursor-not-allowed text-${textColor} ${rounded} ${fontWeight} px-3 py-2 w-fit flex justify-center ${classNames}`} type='submit' disabled>
          {children}
        </button>
      )
    default:
      return (
        <button className={`bg-${bgColor} text-${textColor} ${rounded} ${fontWeight} hover:bg-${bgColor} px-3 py-2 w-fit flex justify-center ${classNames}`} type='button'>
          {children}
        </button>
      )
  }
}

export const LoadingButton = ({ bgColor = '', classNames = '' }) => {
  return (
    <button type='button' disabled className={`bg-${bgColor} ${classNames}`}>
      <LoadingUI className='mx-[3px]' width={25} height={25} type='spin' /> Cargando
    </button>
  )
}
