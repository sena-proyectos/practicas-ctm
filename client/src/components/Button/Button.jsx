const Button = ({ value, bg = 'bg-primary', border = '0' }) => {
  return <button className={`${bg} ${border} rounded-md w-72 py-1.5 mx-auto text-white text-sm font-semibold`}>{value}</button>
}

export { Button }
