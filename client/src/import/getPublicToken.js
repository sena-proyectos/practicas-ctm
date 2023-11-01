export const getPublicTokenFromSession = () => {
  const token = sessionStorage.getItem('public-token')
  return token
}
