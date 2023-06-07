import { Link } from 'react-router-dom'
import { Button } from '../Button/Button'

const Card = ({ title, titleColor, description, buttonText, bgColor, link, scale }) => {
  return (
    <div className={`${bgColor} bg-opacity-50 rounded-lg p-3 flex flex-col justify-center ${scale && 'scale-90'}`}>
      <h2 className={`text-${titleColor} text-center font-semibold text-lg mb-3`}>{title}</h2>
      <p className='text-center text-sm'>{description}</p>
      {link && (
        <Link to={link} className='rounded-md border-1 p-1 w-fit justify-self-end ml-auto mt-5 font-semibold text-xs'>
          {buttonText}
        </Link>
      )}
    </div>
  )
}

export { Card }
