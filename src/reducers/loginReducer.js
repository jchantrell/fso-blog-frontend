import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const initialState = null

const loginSlice = createSlice({
  name: 'login',
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

export const { setUser } = loginSlice.actions

export const login = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials)
    window.localStorage.setItem('user', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch(setUser(user))
  }
}
export default loginSlice.reducer
