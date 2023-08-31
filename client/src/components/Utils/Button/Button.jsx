export const Button = ({ value = '', bg = 'bg-primary', px = 'px-[5rem]', textColor = 'text-white', rounded = 'rounded-md', shadow = 'shadow-none', onClick, font = 'font-semibold', textSize = 'text-lg', py = 'py-1.5', hover = false, icon, isDisabled = false, type = 'submit', hoverConfig = '', classNames }) => {
  return (
    <button type={type} disabled={isDisabled} className={`${isDisabled ? 'bg-slate-500' : bg} ${rounded} ${px} shadow-${shadow} shadow-current ${py} mx-auto ${textColor} ${textSize} ${font} ${hover && `transition-colors hover:${hoverConfig}`} ${icon && 'flex items-center gap-1'} ${classNames}`} onClick={onClick}>
      {icon} {value}
    </button>
  )
}

