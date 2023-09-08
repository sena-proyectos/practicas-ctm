import { create } from 'zustand'

export const inscriptionStore = create((set) => ({
  inscriptionData: {},
  setInscriptionData: (data) => set({ inscriptionData: data })
}))
