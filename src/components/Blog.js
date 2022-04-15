import { useState } from 'react'

const Blog = ({blog, updateLikes}) => {

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

  const addLike = (event) => {
    updateLikes({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+=1,
      id: blog.id
    })

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
            <div>likes: {blog.likes} 
            <button onClick={addLike}>like</button>
            </div>
          </div>
        </div> 
    </div>
   
)}

export default Blog
