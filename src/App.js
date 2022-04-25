import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AccountForm from './components/AccountForm'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import BlogInfo from './components/BlogInfo'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import UserInfo from './components/UserInfo'

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

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    dispatch(setUser(null))
    dispatch(displayNotification('Logged out'))
  }

  const Home = () => {
    return (
      <div>
        <Notification />
        <Togglable buttonLabel="Post">
          <BlogForm />
        </Togglable>
        <BlogList />
      </div>
    )
  }

  const Menu = () => {
    const style = {
      padding: '3px',
      backgroundColor: 'lightgrey',
    }

    return (
      <div style={style}>
        <Link style={style} to="/">
          Home
        </Link>
        <Link style={style} to="/users">
          Users
        </Link>
        <Link to={`/users/${user.id}`}>{user.username}</Link>
        <button onClick={() => handleLogout()}>logout</button>
      </div>
    )
  }

  const LandingPage = () => {
    return (
      <div>
        <h3>Welcome to our app</h3>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/signup">
          <button>New User</button>
        </Link>
      </div>
    )
  }

  if (user === null) {
    return (
      <Router>
        <h2>Blogger App</h2>
        <Notification />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<AccountForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Router>
    )
  }

  return (
    <div>
      <Router>
        <Menu />
        <h2>Blogger App</h2>

        <Routes>
          <Route path="/signup" element={<AccountForm />} />
          <Route path="/users/:id" element={<UserInfo />} />
          <Route path="/blogs/:id" element={<BlogInfo />} />
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserList />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
