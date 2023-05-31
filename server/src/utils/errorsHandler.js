export const handleHTTP = (res, error) => {
  res.status(500)
  res.send({ error })
}
