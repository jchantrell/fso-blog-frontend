import { useState, useEffect } from 'react'

import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState('')

    useEffect(() => {
        const loggedInUser = window.localStorage.getItem('user')
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser)
            blogService.setToken(user.token)
            setUser(user)}
    }, [])

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs ))
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

            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
            setNotification(`Logged in as ${user.username}`)
            setTimeout(() => {
                setNotification(null)
            }, 5000)}
        catch (error) {
            setNotification('Login failed')
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('user')
        setUser(null)
        setNotification('Logged out')
        setTimeout(() => {
            setNotification(null)
        }, 5000)
    }

    const addBlog = (blog) => {
        blogService
            .create(blog)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
                setNotification(`Added ${blog.title} by ${blog.author}`)
                setTimeout(() => {
                    setNotification(null)
                }, 5000)
            })
            .catch(error => {
                setNotification('Failed to add blog')
                console.log(error)
                setTimeout(() => {
                    setNotification(null)
                }, 5000)
            })
    }

    const updateBlog = (blog) => {
        blogService
            .update(blog)
            .then(returnedBlog => {
                setNotification(`Liked ${returnedBlog.title} by ${returnedBlog.author}`)
                setTimeout(() => {
                    setNotification(null)
                }, 5000)
            })
            .catch(error => {
                console.log(error)
                setNotification('Failed to update blog')
                setTimeout(() => {
                    setNotification(null)
                }, 5000)
            })
    }

    const deleteBlog = (blog) => {
        blogService
            .remove(blog)
            .then(returnedBlog => {
                handleRemoveBlog(returnedBlog)
                setNotification(`Removed ${blog.title} by ${blog.author}`)
                setTimeout(() => {
                    setNotification(null)
                }, 5000)
            })
            .catch(error => {
                setNotification(error)
                setTimeout(() => {
                    setNotification(null)
                }, 5000)
            })
    }

    const handleRemoveBlog = (blog) => {
        const id = blog.id
        setBlogs(blogs.filter(item => item.id !== id))
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
                <Notification
                    message={notification} />
                <Togglable
                    buttonLabel='new blog'>
                    <BlogForm createBlog={addBlog}/>
                </Togglable>
                <Blogs
                    user={user}
                    blogs={blogs}
                    updateLikes={updateBlog}
                    deleteBlog={deleteBlog}/>
            </div>
        </div>
    )
}

export default App
