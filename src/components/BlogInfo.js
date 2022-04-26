import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { like, createComment } from '../reducers/blogReducer'

import { displayNotification } from '../reducers/notificationReducer'
import DeleteButton from './BlogDeleteButton'

const BlogInfo = () => {
  const dispatch = useDispatch()
  const [content, setContent] = useState('')
  const user = useSelector((state) => state.login)
  const id = useParams().id
  const blogs = useSelector((state) => state.blogs)
  if (!blogs) {
    return null
  }
  const blog = blogs.find((b) => b.id === id)
  if (!blog) {
    return null
  }

  const addComment = async (event) => {
    event.preventDefault()

    const comment = {
      content: content,
      likes: 0,
      blogId: blog.id,
    }

    setContent('')
    dispatch(displayNotification('Added comment', 5))
    dispatch(createComment(comment, blog))
  }

  const handleContentChange = (event) => {
    setContent(event.target.value)
  }

  if (!user) {
    return (
      <div>
        <h2>
          {blog.title} by {blog.author}
        </h2>
        <div>{blog.url}</div>
        <div>
          Likes: {blog.likes}{' '}
          <button
            className="likeBlogButton"
            onClick={() => {
              dispatch(like(blog))
            }}
          >
            Like
          </button>
        </div>
        Comments
        {blog.comments.map((comment) => (
          <div key={comment.id}>{comment.content}</div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <div>{blog.url}</div>
      <div>
        Likes: {blog.likes}{' '}
        <button
          className="likeBlogButton"
          onClick={() => {
            dispatch(like(blog))
          }}
        >
          Like
        </button>
      </div>
      <div>
        Added by {blog.user.username}{' '}
        {blog.user.username === user.username ? (
          <DeleteButton blog={blog} />
        ) : null}
      </div>
      Comments
      <form onSubmit={addComment}>
        <input
          type="text"
          value={content}
          name="Content"
          onChange={handleContentChange}
        />
        <button type="submit">Post</button>
      </form>
      {blog.comments.map((comment) => (
        <div key={comment.id}>{comment.content}</div>
      ))}
    </div>
  )
}

export default BlogInfo
