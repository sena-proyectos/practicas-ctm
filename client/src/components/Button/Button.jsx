export const Button = ({ value, bg = 'bg-primary', px = 'px-[5rem]' }) => {
  return <button className={`${bg} rounded-md ${px} py-1.5 mx-auto text-white text-lg font-semibold w-72`}>{value}</button>
}
