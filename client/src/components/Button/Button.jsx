export const Button = ({ value, bg = 'bg-primary', px = 'px-[5rem]', textColor = 'text-white', rounded = 'rounded-md', shadow = 'shadow-none' }) => {
  return <button className={`${bg} ${rounded} ${px} ${shadow} py-1.5 mx-auto ${textColor} text-lg font-semibold`}>{value}</button>
}
