export const randomNumberGenerator = (min = 8) => {
  const minDigits = min
  const randomPart = Math.floor(Math.random() * Math.pow(10, minDigits))
  const randomNumber = '0' + randomPart.toString()
  return randomNumber
}