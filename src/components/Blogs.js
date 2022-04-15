import Blog from './Blog'

const Blogs = ({ blogs, updateLikes }) => {

    blogs.sort((a, b) => b.likes > a.likes ? 1 : -1)

    return (
      <div>
      {blogs.map(blog => 
      <Blog key={blog.id} blog={blog} updateLikes={updateLikes} />)}
      </div>
    )
}

export default Blogs