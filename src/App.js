import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('user')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'user', JSON.stringify(user)
      ) 

      setUser(user)
      setUsername('')
      setPassword('')
      console.log(user)
    } catch (exception) {
      console.log(exception)
      setTimeout(() => {
        
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const displayBlogs = () => {
    return (
      <div>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
      
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <div>
        <p>welcome back {user.name}  <button onClick={() => handleLogout()}>logout</button></p>
        {displayBlogs()}
      </div>
    </div>
  )
}

export default App
