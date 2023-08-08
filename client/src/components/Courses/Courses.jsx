import { Footer } from '../Footer/Footer'
import { Search } from '../Search/Search'
import { Siderbar } from '../Siderbar/Sidebar'

export const Courses = () => {
  return (
    <main className="flex flex-row min-h-screen">
      <Siderbar />
      <section className="relative grid flex-auto grid-rows-3-10-75-15">
        <header className="grid place-items-center">
          <Search searchFilter />
        </header>
        <section className="grid grid-cols-1 px-10 pt-5 pb-2 gap-x-4 gap-y-3 sm:grid-cols-2 md:grid-cols-3">
          <div className="[perspective:1000px] group flex flex-col gap-1 rounded-xl md:h-[10.5rem] sm:h-[10rem] ">
            <div className="relative w-full h-full rounded-xl shadow-xl transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              <div className="absolute w-full h-full bg-blue-300 rounded-xl"></div>
              <div className="absolute w-full h-full rounded-xl bg-slate-500 [transform:rotateY(180deg)] [backface-visibility:hidden]"></div>
            </div>
          </div>
        </section>
        <Footer />
      </section>
    </main>
  )
}
