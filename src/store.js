import { configureStore } from '@reduxjs/toolkit'

import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import notificationReducer from './reducers/notificationReducer'
import showNotificationReducer from './reducers/showNotificationReducer'
import showBlogFormReducer from './reducers/showBlogFormReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    showNotification: showNotificationReducer,
    showBlogForm: showBlogFormReducer,
    blogs: blogReducer,
    login: loginReducer,
    users: userReducer,
  },
})

export default store
