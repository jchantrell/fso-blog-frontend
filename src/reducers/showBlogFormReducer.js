import { createSlice } from '@reduxjs/toolkit'

const initialState = false

const newBlogSlice = createSlice({
  name: 'showBlogForm',
  initialState,
  reducers: {
    showBlogForm: {
      reducer: (state, action) => {
        return (state = action.payload)
      },
    },
  },
})

export const { showBlogForm } = newBlogSlice.actions

export default newBlogSlice.reducer
