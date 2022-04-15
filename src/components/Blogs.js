import Blog from './Blog'

const Blogs = ({ blogs, user, updateLikes, deleteBlog }) => {

    blogs.sort((a, b) => b.likes > a.likes ? 1 : -1)

    return (
      <div>
      {blogs.map(blog => 
      <Blog 
      key={blog.id} 
      blog={blog}
      user={user} 
      updateLikes={updateLikes} 
      deleteBlog={deleteBlog}/>)}
      </div>
    )
}

export default Blogs