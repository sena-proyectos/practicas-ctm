export const Button = ({ value, bg = 'bg-primary', px = 'px-[5rem]', textColor = 'text-white' }) => {
  return <button className={`${bg} rounded-md ${px} py-1.5 mx-auto ${textColor} text-lg font-semibold`}>{value}</button>
}
