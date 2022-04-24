import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

const initialState = null

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: {
      reducer: (state, action) => {
        return action.payload
      },
    },
  },
})

export const { setUsers } = userSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}
export default userSlice.reducer
