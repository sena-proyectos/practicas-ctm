import { Link } from 'react-router-dom'

// Icons
import { BsJournalBookmark } from 'react-icons/bs'

export const Card = ({ title, titleColor, description, buttonText, bgColor = 'bg-white', link, scale, subtitle, shadow, cardHome = false, cardVisits = false, borderColor, roundedLink, info1, info2, icon, isButton = false, showModal, transition = 'transition-none', height = 'h-auto', width = 'w-auto', shadowColor }) => {
  return (
    <div className={`${bgColor} bg-opacity-60 ${shadow} ${shadowColor} flex ${height} flex-col justify-center rounded-2xl px-3 py-2 ${scale && 'scale-90'} ${width}`}>
      <header>
        <div>
          <h2 className={`text-${titleColor} mb-1 break-words text-center text-lg font-semibold `}>{title}</h2>
          <h3 className='text-xs font-medium text-center break-all'>{subtitle}</h3>
        </div>
      </header>
      <div className='w-4/5 pt-2 mx-auto'>
        {cardVisits && (
          <section className='flex flex-col'>
            <span className='py-1 text-sm text-center'>
              {info1} - {info2}
            </span>
            <section className='flex items-center justify-center gap-2 font-medium'>
              <span>Estado</span>
              {icon}
            </section>
          </section>
        )}
        {(cardHome || cardVisits) && <p className='text-sm text-center'>{description}</p>}
      </div>
      {link && (
        <Link to={link} className={`${roundedLink} border-1 ${borderColor} mx-auto mt-4 w-fit justify-self-end p-1.5 text-xs font-semibold ${transition}`}>
          {buttonText}
        </Link>
      )}
      {isButton && showModal && <button className={`${roundedLink} border-1 ${borderColor} mx-auto mt-4 w-fit justify-self-end p-1.5 text-xs font-semibold`}>{buttonText}</button>}
    </div>
  )
}

export const CardWithChildren = ({ children, classNames = '' }) => {
  return (
    <section aria-describedby='card' className={`px-6 py-5 bg-white rounded-2xl border-2 border-gray-300 ${classNames}`}>
      {children}
    </section>
  )
}

export const Card3D = ({ title, subtitle, header, item1, item2, item3, item4, item1text, item2text, item3text, item4text, onClick }) => {
  return (
    <div className='[perspective:1000px] group flex flex-col gap-1 rounded-xl h-[10rem]' onClick={onClick}>
      <div className='relative w-full h-full rounded-xl transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] bg-white'>
        <div className='-z-30 absolute grid grid-rows-[2fr, 1fr] w-full h-full gap-2  p-3 shadow-lg rounded-xl [backface-visibility:hidden] bg-white '>
          <header className='flex flex-row items-center w-fit '>
            <div className='z-10 border-2 rounded-full w-14 h-14 border-violet-800 bg-violet-200'>
              <BsJournalBookmark className='w-full h-full scale-50' />
            </div>
            <div className='relative w-24 h-5 my-auto text-center border-2 rounded-r-full right-2 border-violet-800 bg-violet-200'>
              <p className='text-xs font-medium'>{header}</p>
            </div>
          </header>
          <section className='h-20'>
            <p className='text-sm font-medium'>{title}</p>
            <span className='text-xs font-light'>{subtitle}</span>
          </section>
        </div>
        <div className='absolute w-full h-full shadow-lg rounded-xl bg-white  [transform:rotateY(180deg)] [backface-visibility:hidden] p-3 flex flex-col gap-1 justify-center'>
          <section className='flex flex-col items-center'>
            <h6 className='text-xs font-medium'>{item1text}</h6>
            <p className='text-xs font-light'>{item1}</p>
          </section>
          <section className='flex flex-col items-center'>
            <h6 className='text-xs font-medium'>{item2text}</h6>
            <p className='text-xs font-light'>{item2}</p>
          </section>
          <section className='grid grid-cols-2'>
            <section className='flex flex-col items-center'>
              <h6 className='text-xs font-medium'>{item3text}</h6>
              <p className='text-xs font-light'>{item3}</p>
            </section>
            <section className='flex flex-col items-center'>
              <h6 className='text-xs font-medium'>{item4text}</h6>
              <p className='text-xs font-light'>{item4}</p>
            </section>
          </section>
        </div>
      </div>
    </div>
  )
}

export const CardStudent = ({ nameStudent, emailStudent, programStudent, courseStudent, height, userID }) => {
  return (
    <section className={`${height} rounded-lg shadow-xl w-auto bg-white`}>
      <header className='h-[40%] rounded-t-lg flex flex-col justify-center px-2 relative z-10 before:absolute before:inset-0 before:w-full before:h-full before:bg-black/50 before:-z-10 before:rounded-t-lg' style={{ backgroundImage: 'url("https://www.profesionalonline.com/blog/wp-content/uploads/2022/01/que-es-la-programacion-orientada-a-objetos-header.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <p className='text-xs font-medium text-right text-white'>{courseStudent}</p>
        <h3 className='text-[13px] font-medium text-right text-white'>{programStudent}</h3>
      </header>
      <section className='flex flex-col items-center h-[60%] rounded-b-lg justify-center gap-y-3'>
        <div className='flex flex-col items-center justify-center'>
          <p className='text-[15px] text-center'>{nameStudent}</p>
          <span className='text-xs font-light'>{emailStudent}</span>
        </div>
        <Link to={`/info-aprendiz/${userID}`} type='button' className='px-4 py-[2.5px] mx-auto text-xs font-light text-white bg-blue-800 rounded-lg w-fit hover:bg-blue-900 transition-colors'>
          Más información
        </Link>
      </section>
    </section>
  )
}
