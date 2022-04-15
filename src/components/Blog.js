import { useState } from 'react'

const Blog = ({blog, user, updateLikes, deleteBlog}) => {

  const [blogDetails, setBlogDetails] = useState(false)
  const [deleteVisible, setDeleteVisible] = useState(false)

  const hiddenDetails = { display: blogDetails ? 'none' : '' }
  const shownDetails = { display: blogDetails ? '' : 'none' }
  const showDelete = { display: deleteVisible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderColor: 'white',
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

  const removeBlog = (event) => {
    if (window.confirm(`do you want to remove ${blog.title} by ${blog.author}?`)){
      deleteBlog({
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        id: blog.id
      })
    }
  }

  const deleteButton = () => {
    return (
      <div>
        <button onClick={removeBlog}>remove</button>
      </div>
    )
  }

  return (

    <div>
        <div style={hiddenDetails}>
          <div style={blogStyle}>
            {blog.title} by {blog.author} <button onClick={() => setBlogDetails(true)}>view</button>
          </div>
        </div>
        <div style={shownDetails}>
          <div style={blogStyle}>
            <div>{blog.title} by {blog.author} <button onClick={() => setBlogDetails(false)}>hide</button></div>
            <div>url: {blog.url}</div>
            <div>likes: {blog.likes}
              <button onClick={addLike}>like</button>
            </div>
            <div>posted by: {blog.user.username}</div>
            {user.username === blog.user.username 
              ? deleteButton()
              : null}
          </div>
        </div> 
    </div>
   
)}

export default Blog
