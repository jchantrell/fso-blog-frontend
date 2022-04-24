import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { displayNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault()

    const blog = {
      title: title,
      author: author,
      url: url,
    }

    setTitle('')
    setAuthor('')
    setUrl('')
    dispatch(displayNotification(`Added ${title} by ${author}`, 5))
    dispatch(createBlog(blog))
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            className="blogTitleInput"
            type="text"
            value={title}
            name="Title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
            className="blogAuthorInput"
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
            className="blogUrlInput"
            type="text"
            value={url}
            name="URL"
            onChange={handleUrlChange}
          />
        </div>
        <button className="blogSubmit" type="submit">
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
