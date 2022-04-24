import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { like } from '../reducers/blogReducer'
import DeleteButton from './BlogDeleteButton'

import { Link } from 'react-router-dom'

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
  const user = useSelector((state) => state.login)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div className="blog">
      <div id={blog.id}>
        <div style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} - {blog.author}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BlogList
