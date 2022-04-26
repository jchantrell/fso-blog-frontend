import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { displayNotification } from '../reducers/notificationReducer'
import { create } from '../reducers/userReducer'
import { useNavigate, Link } from 'react-router-dom'
import { appendUser } from '../reducers/userReducer'

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

  const createUser = async (event) => {
    event.preventDefault()
    dispatch(create({ username, password })).then((res) => {
      const val = String(res)
      if (val.includes('Error')) {
        dispatch(
          displayNotification(
            'Failed to create account. Bad username or password.',
            5
          )
        )
      } else {
        dispatch(displayNotification('Successfully created account.', 5))
        dispatch(appendUser(res))
        navigate('/login')
      }
    })
  }

  return (
    <div>
      <h3>Account creation is free</h3>
      <form onSubmit={createUser}>
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
