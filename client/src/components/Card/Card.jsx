import { Button } from '../Button/Button'

const Card = ({
  title,
  titleColor,
  description,
  descriptionColor,
  // image,
  // link,
  isButton,
  buttonText,
  isModal,
  // isRounded,
  // modalText,
  innerOnClick,
  bgColor,
}) => {
  return (
    <div className={`${bgColor} rounded-lg`}>
      <h2 className={`${titleColor}`}>{title}</h2>
      <p className={`${descriptionColor}`}>{description}</p>
      {isButton && <Button className="card" onClick={innerOnClick} value={buttonText} />}
      {isModal && <p>Hola</p>}
    </div>
  )
}

export { Card }
