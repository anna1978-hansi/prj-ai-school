import { configureStore } from '@reduxjs/toolkit'
import authReducer from './modules/auth/reducer'

const store = configureStore({
  reducer: {
    auth: authReducer
  }
})

export default store 