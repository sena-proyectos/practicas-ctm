import { Button } from '../button/button'

export const Form = ({ inputs }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <form action="" className="flex flex-col justify-center my-4 gap-3" onSubmit={handleSubmit}>
      {inputs.map((item, i) => {
        return (
          <div className="relative text-gray-400 mx-auto" key={i}>
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">{item.icon}</span>
            <input type="search" name="q" className="py-1.5 text-sm text-black bg-white border-1 border-gray-400 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900 w-72" placeholder={item.placeholder} autoComplete="on" />
          </div>
        )
      })}
      <hr className="w-4/5 mx-auto bg-slate-500 h-[1px] my-2" />
      <Button value={'Iniciar Sesión'} bg={'bg-primary'} />
    </form>
  )
}
