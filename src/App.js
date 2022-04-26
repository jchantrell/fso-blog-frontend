import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom'

import { Container, ThemeProvider, createTheme } from '@mui/material'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AccountForm from './components/AccountForm'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import BlogInfo from './components/BlogInfo'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

import UserList from './components/UserList'
import UserInfo from './components/UserInfo'

import Nav from './components/Nav'

import blogService from './services/blogs'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { setUser } from './reducers/loginReducer'
import { displayNotification } from './reducers/notificationReducer'
import BlogFormModal from './components/BlogFormModal'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const userIsLoggedIn = window.localStorage.getItem('user')
    if (userIsLoggedIn) {
      const user = JSON.parse(userIsLoggedIn)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }, [])

  const NoUser = () => {
    return (
      <>
        <Router>
          <Nav />
          <Notification />
          <Container>
            <Routes>
              <Route path="/" element={<BlogList />} />
              <Route path="/signup" element={<AccountForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/users/:id" element={<UserInfo />} />
              <Route path="/blogs/:id" element={<BlogInfo />} />
              <Route path="/users" element={<UserList />} />
            </Routes>
          </Container>
        </Router>
      </>
    )
  }

  const LoggedInUser = () => {
    return (
      <>
        <Router>
          <BlogFormModal />
          <Nav />
          <Notification />
          <Container>
            <Routes>
              <Route path="/" element={<BlogList />} />
              <Route path="/signup" element={<AccountForm />} />
              <Route path="/users/:id" element={<UserInfo />} />
              <Route path="/blogs/:id" element={<BlogInfo />} />
              <Route path="/users" element={<UserList />} />
            </Routes>
          </Container>
        </Router>
      </>
    )
  }

  if (user === null) {
    return <NoUser />
  }

  return <LoggedInUser />
}

export default App
