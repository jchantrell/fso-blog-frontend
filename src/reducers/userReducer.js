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
    appendUser: {
      reducer: (state, action) => {
        state.push(action.payload)
      },
    },
  },
})

export const { setUsers, appendUser } = userSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}

export const create = (credentials) => {
  return async (dispatch) => {
    try {
      const newUser = await userService.create(credentials)
      return newUser
    } catch (error) {
      return error
    }
  }
}
export default userSlice.reducer
