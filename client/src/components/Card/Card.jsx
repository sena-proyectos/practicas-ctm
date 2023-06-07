import { Link } from 'react-router-dom'

const Card = ({
  title,
  titleColor,
  description,
  // descriptionColor,
  // image,
  // link,
  // isButton,
  buttonText,
  // isModal,
  // isRounded,
  // modalText,
  // innerOnClick,
  bgColor,
  link,
}) => {
  return (
    <div className={`${bgColor} bg-opacity-50 rounded-lg p-3 flex flex-col justify-center`}>
      <h2 className={`text-${titleColor} text-center font-semibold text-xl mb-3`}>{title}</h2>
      <p className="text-center">{description}</p>
      {link && (
        <Link to={link} className="rounded-md border-1 p-1 w-fit justify-self-end ml-auto mt-5 font-semibold text-xs">
          {buttonText}
        </Link>
      )}
    </div>
  )
}

export { Card }
