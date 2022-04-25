import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { displayNotification } from './notificationReducer'

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
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(displayNotification(`Logged in as ${user.username}`, 5))
    } catch (error) {
      dispatch(
        displayNotification('Login failed. Bad username or password.', 5)
      )
    }
  }
}
export default loginSlice.reducer
