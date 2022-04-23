import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { displayNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'

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
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('user', JSON.stringify(user))

      blogService.setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
      dispatch(displayNotification(`Logged in as ${user.username}`, 5))
    } catch (error) {
      dispatch(displayNotification('Logged failed', 5))
    }
  }

  return (
    <div>
      <h2>Blogger</h2>

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
