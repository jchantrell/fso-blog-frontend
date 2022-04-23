import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { like, removeBlog } from '../reducers/blogReducer'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => (b.likes > a.likes ? 1 : -1))

  return (
    <div>
      {sortedBlogs.map((blog) => (
        <Blog blog={blog} key={blog.id} />
      ))}
    </div>
  )
}

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const [blogDetails, setBlogDetails] = useState(false)
  const hiddenDetails = { display: blogDetails ? 'none' : '' }
  const shownDetails = { display: blogDetails ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 5,
  }

  const DeleteButton = () => {
    return (
      <div>
        <button
          onClick={() => {
            if (
              window.confirm(
                `do you want to remove ${blog.title} by ${blog.author}?`
              )
            ) {
              dispatch(removeBlog(blog))
            }
          }}
        >
          remove
        </button>
      </div>
    )
  }

  return (
    <div className="blog">
      <div className="detailsHidden" id={blog.id} style={hiddenDetails}>
        <div style={blogStyle}>
          {blog.title} by {blog.author}
          <button
            className="detailsShowButton"
            onClick={() => setBlogDetails(true)}
          >
            view
          </button>
        </div>
      </div>
      <div className="detailsShown" id={blog.id} style={shownDetails}>
        <div style={blogStyle}>
          <div>
            {blog.title} by {blog.author}
            <button
              className="detailsHideButton"
              onClick={() => setBlogDetails(false)}
            >
              hide
            </button>
          </div>
          <div>url: {blog.url}</div>
          <div className="blogLikes">
            likes: {blog.likes}
            <button
              className="likeBlogButton"
              onClick={() => {
                dispatch(like(blog))
              }}
            >
              like
            </button>
          </div>
          <div>posted by: {blog.user.username}</div>
          {blog.user.username === user.username ? <DeleteButton /> : null}
        </div>
      </div>
    </div>
  )
}

export default BlogList
