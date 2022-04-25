import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { displayNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/loginReducer'
import { useNavigate, Link } from 'react-router-dom'
import Notification from './Notification'

const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(login({ username, password }))
      dispatch(displayNotification(`Logged in as ${username}`, 5))
      setUsername('')
      setPassword('')
    } catch (error) {
      dispatch(displayNotification('Logged failed', 5))
    } finally {
      navigate('/')
    }
  }

  return (
    <div>
      <h3>Welcome back</h3>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            id="username-input"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          Password
          <input
            id="password-input"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button id="login-button" type="submit">
          Login
        </button>

        <div>
          Don&apos;t have an account yet? It&apos;s free
          <Link to="/signup">
            <button id="signup-button">Create</button>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
