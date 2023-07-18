import { Siderbar } from '../Siderbar/Sidebar'
import { Footer } from '../Footer/Footer'
import { Search } from '../Search/Search'
import { AiOutlinePhone, AiOutlineMail } from 'react-icons/ai'
import { Button } from '../Utils/Button/Button'
import { Link } from 'react-router-dom'

export const Teachers = () => {
  //   const [mostrarModal, setMostrarModal] = useState(false)

  //   const handleIconClick = () => {
  //     setMostrarModal(!mostrarModal)
  //   }

  //   const handleModal = () => {
  //     setMostrarModal(!mostrarModal)
  //   }

  return (
    <main className="flex min-h-screen flex-row">
      <Siderbar />
      <section className="relative grid w-min flex-auto grid-rows-3-10-75-15">
        <header className="grid place-items-center">
          <Search searchFilter />
        </header>
        <section className="mx-auto mt-20 flex w-3/5 flex-col gap-2">
          <div className="grid place-items-center ">
            <div className="h-[25rem] w-3/4 rounded-3xl bg-[#d9d9d9]/50 shadow-xl md:w-1/2">
              <section className="mx-auto mt-5 flex w-4/5 flex-col gap-2">
                <div className="mx-auto my-auto w-[4rem] rounded-full">
                  <img className="object-cover" src="public/user.png" alt="img_user" />
                </div>
                <header className="grid place-items-center pt-5">
                  <h2 className="w-3/5 border-b-1 border-primary text-center text-2xl font-medium">Valentino Carlos Rodeo Sevilla</h2>
                </header>
                <div>
                  <div>
                    <AiOutlineMail />
                    <h4 className="text-center">valen3434444@sena.edu.co</h4>
                  </div>
                  <div>
                    <p className="text-center">
                      <AiOutlinePhone /> 3125674511
                    </p>
                  </div>
                </div>
                <Link to="/asignar-ficha">
                  <Button className="mx-auto mt-5" value={'Asignar ficha'} rounded={'rounded-xl'} font={'font-normal'} textSize="text-md" />
                </Link>
              </section>
            </div>
          </div>
        </section>
        <Footer />
      </section>
    </main>
  )
}
