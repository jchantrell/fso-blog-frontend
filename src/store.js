import { configureStore } from '@reduxjs/toolkit'

import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: loginReducer,
  },
})

export default store
