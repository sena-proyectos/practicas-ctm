import { Link } from 'react-router-dom'

// Icons
import { BsJournalBookmark } from 'react-icons/bs'

export const Card = ({ title, titleColor, description, buttonText, bgColor, link, scale, img = 'https://unavatar.io/ConanGH-S', subtitle, shadow, lione, litwo, cardUser = false, cardHome = false, cardVisits = false, alt = 'foto user', borderColor, roundedLink, info1, info2, icon, isButton = false, showModal, modalClicked, transition = 'transition-none', userID, height = 'h-auto', width = 'w-auto', shadowColor }) => {
  const userInfo = () => {
    modalClicked(userID)
  }

  return (
    <div className={`${bgColor} bg-opacity-60 ${shadow} ${shadowColor} flex ${height} flex-col justify-center rounded-2xl px-3 py-2 ${scale && 'scale-90'} ${width}`}>
      <header className={`${cardUser && 'flex flex-row'}`}>
        {cardUser && <img className='h-[4.5rem] w-[4.5rem] rounded-full' src={img} alt={alt} />}
        <div className={`${cardUser && 'flex w-min flex-auto flex-col py-3'}`}>
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
        {cardUser && (
          <>
            <section className='flex flex-row justify-between pb-1'>
              <span className='font-semibold'>Programa de Formación</span>
              <span>{lione}</span>
            </section>
            <section className='flex flex-row justify-between'>
              <span className='font-semibold'>Ficha</span>
              <span>{litwo}</span>
            </section>
          </>
        )}
      </div>
      {link && (
        <Link to={link} className={`${roundedLink} border-1 ${borderColor} mx-auto mt-4 w-fit justify-self-end p-1.5 text-xs font-semibold ${transition}`}>
          {buttonText}
        </Link>
      )}
      {isButton && showModal && (
        <button className={`${roundedLink} border-1 ${borderColor} mx-auto mt-4 w-fit justify-self-end p-1.5 text-xs font-semibold`} onClick={userInfo}>
          {buttonText}
        </button>
      )}
    </div>
  )
}

export const Card3D = ({ title, subtitle, header, item1, item2, item3, item4 }) => {
  return (
    <div className='[perspective:1000px] group flex flex-col gap-1 rounded-xl md:h-[9.5rem] sm:h-[10rem] h-[8rem]'>
      <div className='relative w-full h-full rounded-xl transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] '>
        <div className='absolute flex flex-col w-full h-full gap-3 justify-center p-3 shadow-lg rounded-xl [backface-visibility:hidden] border-slate-100 border-1'>
          <header className='flex flex-row w-fit '>
            <div className='border-2 rounded-full w-14 h-14 border-violet-800 bg-violet-200'>
              <BsJournalBookmark className='w-full h-full scale-50' />
            </div>
            <div className='relative w-24 h-5 my-auto text-center border-2 rounded-r-full right-2 -z-10 border-violet-800 bg-violet-200'>
              <p className='text-xs font-medium'>{header}</p>
            </div>
          </header>
          <section>
            <p className='text-sm font-medium'>{title}</p>
            <span className='text-xs font-light'>{subtitle}</span>
          </section>
        </div>
        <div className='absolute w-full h-full shadow-lg rounded-xl border-slate-100 border-1  [transform:rotateY(180deg)] [backface-visibility:hidden] p-3 flex flex-col gap-1 justify-center'>
          <section className='flex flex-col items-center'>
            <h6 className='text-xs font-medium'>Instructor de Seguimiento</h6>
            <p className='text-xs font-light'>{item1}</p>
          </section>
          <section className='flex flex-col items-center'>
            <h6 className='text-xs font-medium'>Instructor Líder</h6>
            <p className='text-xs font-light'>{item2}</p>
          </section>
          <section className='grid grid-cols-2'>
            <section className='flex flex-col items-center'>
              <h6 className='text-xs font-medium'>Final Lectiva</h6>
              <p className='text-xs font-light'>{item3}</p>
            </section>
            <section className='flex flex-col items-center'>
              <h6 className='text-xs font-medium'>Inicio Práctica</h6>
              <p className='text-xs font-light'>{item4}</p>
            </section>
          </section>
        </div>
      </div>
    </div>
  )
}
