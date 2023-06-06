import { type Response } from 'express'

export const handleHTTP = (res: Response<string | object>, error: string): Response<object> => res.status(500).json({ error })
