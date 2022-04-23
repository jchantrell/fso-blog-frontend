import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'

import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { displayNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const userIsLoggedIn = window.localStorage.getItem('user')
    if (userIsLoggedIn) {
      const user = JSON.parse(userIsLoggedIn)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    dispatch(setUser(null))
    dispatch(displayNotification('Logged out'))
  }

  if (user === null) {
    return (
      <div>
        <Notification />

        <Togglable buttonLabel="Login">
          <LoginForm />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogger</h2>
      <div>
        <p>
          Welcome back {user.username}{' '}
          <button onClick={() => handleLogout()}>logout</button>
        </p>
        <Notification />
        <Togglable buttonLabel="New">
          <BlogForm />
        </Togglable>
        <BlogList />
      </div>
    </div>
  )
}

export default App
