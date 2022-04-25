import { createSlice } from '@reduxjs/toolkit'
import user from '../services/user'
import userService from '../services/user'
import { displayNotification } from './notificationReducer'

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
      dispatch(appendUser(newUser))
      dispatch(displayNotification('Successfully created account', 5))
    } catch (error) {
      dispatch(
        displayNotification(
          'Failed to create account. Bad username or password.',
          5
        )
      )
    }
  }
}
export default userSlice.reducer
