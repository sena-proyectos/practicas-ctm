import { IoSearchOutline } from 'react-icons/io5'
import { LuSettings2 } from 'react-icons/lu'
import { Button } from '../Button/Button'

const Search = ({ searchFilter = false, filter = false }) => {
  return (
    <section className={` ${searchFilter === true ? 'w-2/4' : 'w-1/5'}  h-9 flex items-center justify-center`}>
      {searchFilter && (
        <>
          <form action="" method="get" className="w-full saturate-[100%] flex items-center bg-secondary/10 shadow-md rounded-3xl backdrop-blur-sm ">
            <Button bg={'bg-transparent'} px="px-3" textColor="text-black" className="absolute right-[6px]" value={<IoSearchOutline />} />
            <input type="text" placeholder="Search" className="w-full py-1 flex-1 rounded-3xl outline-none bg-transparent" />
          </form>
          <article className="relative right-[40px]">
            <Button bg={'bg-transparent'} px={'px-3'} textColor="text-black" value={<LuSettings2 />} />
          </article>
        </>
      )}
      {filter && (
        <>
          <Button
            bg={'bg-secondary/10'}
            shadow="shadow-md"
            rounded="rounded-3xl"
            px="px-5"
            textColor={'text-black'}
            value={
              <span className="flex items-center gap-5">
                <LuSettings2 />
                <span className="font-normal text-sm">Filtrar</span>
              </span>
            }
          />
        </>
      )}
    </section>
  )
}

export { Search }
