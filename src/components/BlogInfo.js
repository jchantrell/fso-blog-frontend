import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { like, createComment } from '../reducers/blogReducer'
import { displayNotification } from '../reducers/notificationReducer'
import DeleteButton from './BlogDeleteButton'

const BlogInfo = () => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
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

    const blog = {
      comment: comment,
    }

    setComment('')
    dispatch(displayNotification('Added comment', 5))
    dispatch(createComment(blog))
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value)
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
      <h2>comments</h2>
      <form onSubmit={addComment}>
        <input
          type="text"
          value={comment}
          name="Comment"
          onChange={handleCommentChange}
        />
        <button type="submit">Post</button>
      </form>
    </div>
  )
}

export default BlogInfo
