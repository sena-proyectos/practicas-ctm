export const Button = ({ value, bg = 'bg-primary', px = 'px-[5rem]', textColor = 'text-white', rounded = 'rounded-md', shadow = 'shadow-none', clickeame, font = 'font-semibold', textSize = 'text-lg', py = 'py-1.5', hover = 'hover-none' }) => {
  return (
    <button className={`${bg} ${rounded} ${px} ${shadow} ${py} mx-auto ${textColor} ${textSize} ${font} ${hover} transition-colors `} onClick={clickeame}>
      {value}
    </button>
  )
}
