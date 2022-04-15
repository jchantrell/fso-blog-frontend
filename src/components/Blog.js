import { useState } from 'react'

const Blog = ({blog}) => {

  const [blogVisible, setBlogVisible] = useState(false)

  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

    const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (

    <div>
        <div style={hideWhenVisible}>
          <div style={blogStyle}>
            {blog.title} by {blog.author} <button onClick={() => setBlogVisible(true)}>view</button>
          </div>
        </div>
        <div style={showWhenVisible}>
          <div style={blogStyle}>
            <div>{blog.title} by {blog.author} <button onClick={() => setBlogVisible(false)}>hide</button></div>
            <div>url: {blog.url}</div>
            <div>likes: {blog.likes}</div>
          </div>
        </div> 
    </div>
   
)}

export default Blog
