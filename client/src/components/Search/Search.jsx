import { IoSearchOutline } from 'react-icons/io5'

import { Button } from '../Button/Button'

const Search = () => {
  return (
    <article className="w-2/4 h-9 flex items-center justify-center ">
      <form action="" method="get" className="w-full saturate-[100%] flex items-center bg-gray rounded-3xl backdrop-blur-sm ">
        <input type="text" placeholder="Search" className="w-full px-5 py-1 flex-1 rounded-3xl outline-none bg-transparent" />
        <Button bg={'bg-transparent'} px="px-3" textColor="text-black" className="absolute right-[6px]" value={<IoSearchOutline />} />
      </form>
    </article>
  )
}

export { Search }
