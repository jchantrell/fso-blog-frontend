import { createSlice } from '@reduxjs/toolkit'

const initialState = false

const showNotificationSlice = createSlice({
  name: 'showNotification',
  initialState,
  reducers: {
    showNotification: {
      reducer: (state, action) => {
        return (state = action.payload)
      },
    },
  },
})

export const { showNotification } = showNotificationSlice.actions

export default showNotificationSlice.reducer
