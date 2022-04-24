import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { displayNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/loginReducer'

const LoginForm = () => {
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
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username-input"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            id="password-input"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
