const Blog = ({blog}) => (
  <div>
    {blog.title} by {blog.author} - {blog.url}
  </div>  
)

export default Blog