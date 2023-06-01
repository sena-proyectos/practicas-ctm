const Button = ({ value, bg = 'bg-primary' }) => {
  return <button className={`${bg} rounded-md w-72 py-1.5 mx-auto text-white text-sm font-semibold`}>{value}</button>
}

export { Button }
