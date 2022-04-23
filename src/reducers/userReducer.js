import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: {
      reducer: (state, action) => {
        const content = action.payload
        return (state = content)
      },
    },
  },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
