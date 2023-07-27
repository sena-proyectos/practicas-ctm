import { createSlice } from '@reduxjs/toolkit'

const rolesSlice = createSlice({
  name: 'rol',
  initialState: null,
  reducers: {
    setIdRol: (state, action) => {
      return action.payload
    },
  },
})

export const { setIdRol } = rolesSlice.actions
export default rolesSlice.reducer
