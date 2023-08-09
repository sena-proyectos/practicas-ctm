import { Siderbar } from '../Siderbar/Sidebar'
import { Footer } from '../Footer/Footer'
import { Search } from '../Search/Search'
import { Button } from '../Utils/Button/Button'
import { FaUser } from 'react-icons/fa'
import { useState } from 'react'

export const AssignClass = ({ fichas = [] }) => {
  const [courses, setCourses] = useState({
    data: [
      ...fichas.map((item) => {
        ficha:  item.numero_ficha;
        name: item.nombre_programa_formacion;
        assign: false
      })
    ],
  })

  const [filterAssign, setFilterAssign] = useState('assigned')

  const handleBtnAssign = (ficha) => {
    const updatedCourses = courses.data.map((course) => {
      if (course.ficha === ficha) {
        return {
          ...course,
          assign: !course.assign,
        }
      }
      return course
    })

    setCourses({ data: updatedCourses })
  }

  const handleFilterAssigned = () => {
    setFilterAssign('assigned')
  }

  const handleFilterUnassigned = () => {
    setFilterAssign('unassigned')
  }

  const filteredCourses = courses.data.filter((course) => {
    if (filterAssign === 'assigned') {
      return course.assign === true
    } else if (filterAssign === 'unassigned') {
      return course.assign === false
    }
    return true // Si el filtro es "Mostrar Todos", muestra todos los cursos
  })

  const colorsCard = [
    {
      bordercolor: 'border-sky-400',
      bgcolor: 'bg-third',
    },
    {
      bordercolor: 'border-sky-950',
      bgcolor: 'bg-slate-500',
    },
  ]

  const allColors = filteredCourses.map((_, index) => ({
    ...colorsCard[index % colorsCard.length],
  }))

  return (
    <main className="flex flex-row min-h-screen">
      <Siderbar />
      <section className="relative grid flex-auto w-min grid-rows-3-10-75-15">
        <header className="grid place-items-center">
          <Search searchFilter />
        </header>
        <section>
          <h2 className="text-center">Stiven Blandón Urrego</h2>
          <div className="flex flex-row gap-5 mx-auto mt-2 w-fit">
            <Button value={'Asignados'} bg="bg-third" px="px-2" textColor="text-black" font="font-light" textSize="text-sm" rounded="rounded-2xl" py="py-1" shadow="shadow-lg" clickeame={handleFilterAssigned} />
            <Button value={'Sin asignar'} bg="bg-third" px="px-2" textColor="text-black" font="font-light" textSize="text-sm" rounded="rounded-2xl" py="py-1" shadow="shadow-lg" clickeame={handleFilterUnassigned} />
          </div>
          <section className="grid grid-cols-1 px-10 pt-5 pb-2 gap-x-4 gap-y-3 sm:grid-cols-2 md:grid-cols-3">
            {allColors.map((color, index) =>
              filteredCourses[index] ? (
                <div key={index} {...color} className={`flex flex-col gap-1 p-3 border-2 rounded-xl ${color.bordercolor} md:h-[10.5rem] sm:h-[10rem]`}>
                  <header className="flex flex-row w-fit ">
                    <div className={`border-2 rounded-full w-14 h-14 ${color.bgcolor} ${color.bordercolor}`}>
                      <FaUser className="w-full h-full scale-75 rounded-full" />
                    </div>
                    <div className={`relative w-24 h-5 my-auto text-center rounded-r-full ${color.bgcolor} ${color.bordercolor} right-2 -z-10`}>
                      <p className="text-xs font-medium">{filteredCourses[index].ficha}</p>
                    </div>
                  </header>
                  <p className="text-[13px] font-light text-justify">{filteredCourses[index].name}</p>
                  <div className="mt-auto ml-auto w-fit">
                    <Button value={filteredCourses[index].assign ? 'Quitar' : 'Asignar'} bg={filteredCourses[index].assign ? 'bg-red-300' : 'bg-slate-200'} textColor="text-black" font="font-extralight" rounded="rounded-full" textSize="text-sm" px="px-5" py="py-[0.8px]" hover={filteredCourses[index].assign ? 'hover:bg-red-400' : 'hover:bg-green-300'} clickeame={() => handleBtnAssign(filteredCourses[index].ficha)} />
                  </div>
                </div>
              ) : null
            )}
          </section>
        </section>
        <Footer />
      </section>
    </main>
  )
}
