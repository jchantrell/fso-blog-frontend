import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    appendBlog: {
      reducer: (state, action) => {
        state.push(action.payload)
      },
    },
    setBlogs: {
      reducer: (state, action) => {
        return action.payload
      },
    },
    updateBlog: {
      reducer: (state, action) => {
        return state.map((blog) =>
          blog.id !== action.payload.id ? blog : action.payload
        )
      },
    },
    deleteBlog: {
      reducer: (state, action) => {
        return state.filter((blog) => blog.id !== action.payload.id)
      },
    },
  },
})

export const { deleteBlog, updateBlog, appendBlog, setBlogs } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogsService.create(blog)
    dispatch(appendBlog(newBlog))
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogsService.remove(blog)
    dispatch(deleteBlog(blog))
  }
}

export const like = (blog) => {
  return async (dispatch) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    const newBlog = await blogsService.update(updatedBlog)
    dispatch(updateBlog(newBlog))
  }
}

export default blogSlice.reducer
