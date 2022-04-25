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

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  })

  const Home = () => {
    return (
      <div>
        <BlogList />
      </div>
    )
  }

  if (user === null) {
    return (
      <>
        <ThemeProvider theme={darkTheme}>
          <Notification />
          <Router>
            <Nav />
            <Container>
              <Routes>
                <Route path="/" element={<Home theme={darkTheme} />} />
                <Route
                  path="/signup"
                  element={<AccountForm theme={darkTheme} />}
                />
                <Route
                  path="/login"
                  element={<LoginForm theme={darkTheme} />}
                />
              </Routes>
            </Container>
          </Router>
        </ThemeProvider>
      </>
    )
  }

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Notification />
        <Router>
          <Nav />
          <Container>
            <Routes>
              <Route
                path="/signup"
                element={<AccountForm theme={darkTheme} />}
              />
              <Route
                path="/users/:id"
                element={<UserInfo theme={darkTheme} />}
              />
              <Route
                path="/blogs/:id"
                element={<BlogInfo theme={darkTheme} />}
              />
              <Route path="/" element={<Home theme={darkTheme} />} />
              <Route path="/users" element={<UserList theme={darkTheme} />} />
            </Routes>
          </Container>
        </Router>
      </ThemeProvider>
    </>
  )
}

export default App
