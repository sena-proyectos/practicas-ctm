import { Link } from 'react-router-dom'

const Card = ({ title, titleColor, description, buttonText, bgColor, link, scale, img = 'https://unavatar.io/iLestar', subtitle, lione, litwo, cardUser = false, cardHome = false, alt = 'foto user' }) => {
  return (
    <div className={`${bgColor} bg-opacity-50 rounded-lg p-3 flex flex-col justify-center h-auto ${scale && 'scale-90'}`}>
      {cardUser && (
        <section>
          <div className="flex flex-row">
            <img className="w-[4.5rem] h-[4.5rem] rounded-full" src={img} alt={alt} />
            <div className="flex flex-col flex-auto w-min py-3">
              <h2 className={`text-${titleColor} text-center font-semibold text-base mb-1 break-words `}>{title}</h2>
              {/* <h3 className="text-center text-xs">{subtitle}</h3> */}
            </div>
          </div>
          <div className="w-4/5 mx-auto pt-2">
            <article className="flex flex-row justify-between pb-1">
              <span className="font-semibold">Programa de Formación</span>
              <span>{lione}</span>
            </article>
            <article className="flex flex-row justify-between">
              <span className="font-semibold">Ficha</span>
              <span>{litwo}</span>
            </article>
          </div>
        </section>
      )}

      {cardHome && (
        <div>
          <h2 className={`text-${titleColor} text-center font-semibold text-lg mb-3`}>{title}</h2>
          <p className="text-center text-sm">{description}</p>
        </div>
      )}

      {link && (
        <Link to={link} className="rounded-md border-1 p-1 w-fit justify-self-end ml-auto mt-5 font-semibold text-xs">
          {buttonText}
        </Link>
      )}
    </div>
  )
}

export { Card }
