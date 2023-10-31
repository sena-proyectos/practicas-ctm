import { create } from 'zustand'

export const inscriptionStore = create((set) => ({
  inscriptionData: {},
  setInscriptionData: (data) => set({ inscriptionData: data })
}))

export const userStore = create((set) => ({
  userId: null,
  setUserId: (data) => set({ userId: data })
}))

export const apprenticeStore = create((set) => ({
  apprenticeData: {},
  setApprenticeData: async (data) => {
    sessionStorage.setItem('apprenticeData', JSON.stringify(data))
    data.nombre_completo = data.nombre_completo
      .split(' ')
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      })
      .join(' ')
    set({ apprenticeData: data })
  }
}))
