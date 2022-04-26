import { createSlice } from '@reduxjs/toolkit'
import { showNotification } from './showNotificationReducer'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotification: {
      reducer: (state, action) => {
        const content = action.payload
        return (state = `${content}`)
      },
    },
    clearNotification: {
      reducer: (state, action) => {
        return (state = initialState)
      },
    },
  },
})

export const displayNotification = (content, time) => {
  return async (dispatch) => {
    dispatch(showNotification(true))
    dispatch(setNotification(content))

    setTimeout(() => {
      dispatch(showNotification(false))
      dispatch(clearNotification())
    }, time * 1000)
  }
}

export const { setNotification, clearNotification } = notificationSlice.actions

export default notificationSlice.reducer
