import ReactPaginate from 'react-paginate'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

export const Pagination = ({ pageCount, pageNumber, setPageNumber }) => {
  return (
    <div className='absolute bottom-0'>
      <ReactPaginate nextLabel={<AiOutlineRight className='h-full mx-auto' />} previousLabel={<AiOutlineLeft className='h-full mx-auto' />} className='flex flex-row gap-4 my-4 pagination justify-content-center' pageCount={pageCount} nextClassName='btn w-[2.2rem] text-center py-1 bg-purple-500 rounded-full hover:bg-purple-900 text-white' previousClassName='btn w-[2.2rem] text-center py-1 bg-purple-500 rounded-full hover:bg-purple-900 text-white' pageClassName='page-item w-[2.2rem] text-center h-[2.2rem] py-[0.4rem] bg-purple-500 rounded-full hover:bg-purple-900 text-white select-none ' pageLinkClassName='page-link' activeClassName='active bg-purple-900 text-white' onPageChange={(data) => setPageNumber(data.selected)} forcePage={pageNumber} />
    </div>
  )
}
