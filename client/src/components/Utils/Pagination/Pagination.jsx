import ReactPaginate from 'react-paginate'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

export const Pagination = ({ pageCount, setPageNumber }) => {
  return (
    <div className='absolute bottom-0'>
      <ReactPaginate nextLabel={<AiOutlineRight className='h-full mx-auto' />} previousLabel={<AiOutlineLeft className='h-full mx-auto' />} className='flex flex-row w-64 gap-2 my-4 justify-evenly' pageCount={pageCount} nextClassName='btn w-[2.2rem] text-center py-1 bg-purple-500 rounded-full hover:bg-purple-900 text-white' previousClassName='btn w-[2.2rem] text-center py-1 bg-purple-500 rounded-full hover:bg-purple-900 text-white' pageClassName='page-item w-[2.2rem] text-center h-[2.2rem] py-[0.4rem] bg-purple-500 rounded-full hover:bg-purple-900 text-white select-none ' pageLinkClassName='page-link' activeClassName='active bg-purple-900 text-white' pageRangeDisplayed={0} marginPagesDisplayed={1} onPageChange={(data) => setPageNumber(data.selected)} />
    </div>
  )
}
