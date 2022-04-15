import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('user')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const Notification = ({message}) => {
    if (message === null){
      return null
    }

    return (
      <div className='notification'>
        {message}
      </div>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'user', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification(`Logged in as ${user.username}`)
      console.log(user)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (error) {
      setNotification('Login failed')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
    setNotification(`Logged out`)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }


  const Blogs = () => {
    return (
      <div>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
      </div>
    )
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blog = {
      title: title,
      author: author,
      url: url,
    }


    blogService
      .create(blog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
        setNotification(`Added ${blog.title} by ${blog.author}`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
      .catch(error => {
        setNotification(`Failed to add blog`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
    }

  if (user === null) {
    return (
      <div>
        <Notification message={notification} />

        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      </div>
      
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <div>
        <p>welcome back {user.username}  <button onClick={() => handleLogout()}>logout</button></p>
        <Notification message={notification} />
        <Togglable buttonLabel='new blog'>
          <BlogForm 
          handleSubmit={addBlog}
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleUrlChange={({ target }) => setUrl(target.value)}
          title={title}
          author={author}
          url={url}/>
        </Togglable>
        <Blogs />
      </div>
    </div>
  )
}

export default App
