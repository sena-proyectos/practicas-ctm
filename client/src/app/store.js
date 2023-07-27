import { configureStore } from '@reduxjs/toolkit'
import rolesReducer from './rolesSlice'

export default configureStore({
  reducer: {
    id_rol: rolesReducer,
  },
})
