import LoadingUI from 'react-loading'

export const Button = ({ bg = 'bg-primary', px = '', textColor = 'text-white', rounded = '', shadow = 'shadow-none', onClick = () => {}, font = 'font-semibold', textSize = 'text-lg', py = '', hover = false, isDisabled = false, type = 'submit', hoverConfig = '', classNames = '', children = <></>, inline = false, name = '' }) => {
  const hoverConfigText = `hover:${hoverConfig}`
  return (
    <button name='' type={type} disabled={isDisabled} className={`${isDisabled ? 'bg-slate-400' : bg} ${rounded} ${px} shadow-${shadow} shadow-current ${py} mx-auto ${textColor} ${textSize} ${font} ${hover && `transition-colors ${hoverConfigText}`} ${inline && 'flex items-center gap-1'} ${classNames}`} onClick={onClick}>
      {children}
    </button>
  )
}

export const LoadingButton = ({ bgColor = '', classNames = '' }) => {
  return (
    <button type='button' disabled className={`bg-${bgColor} ${classNames}`}>
      <LoadingUI className='mx-[3px]' width={25} height={25} type='spin' /> Cargando
    </button>
  )
}

