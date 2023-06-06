export const Button = ({ value, bg = 'bg-primary' }) => {
  return <button className={`${bg} rounded-md px-[5rem] py-1.5 mx-auto text-white text-lg font-semibold`}>{value}</button>
}
