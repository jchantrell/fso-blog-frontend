import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { displayNotification } from '../reducers/notificationReducer'
import { create } from '../reducers/userReducer'
import { useNavigate, Link } from 'react-router-dom'

const AccountForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      dispatch(create({ username, password }))
    } catch (error) {
      dispatch(displayNotification('Account creation failed', 5))
    } finally {
      setUsername('')
      setPassword('')
      navigate('/login')
    }
  }

  return (
    <div>
      <h3>Account creation is free</h3>
      <form onSubmit={handleSubmit}>
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
        <button id="signup" type="submit">
          Create
        </button>
        <div>
          Already have an account?
          <Link to="/login">
            <button id="login-button">Login</button>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default AccountForm
