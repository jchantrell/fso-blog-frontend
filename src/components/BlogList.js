import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Table, TableBody, TableCell, TableRow } from '@mui/material'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => (b.likes > a.likes ? 1 : -1))

  return (
    <Table>
      <TableBody>
        {sortedBlogs.map((blog) => (
          <Blog blog={blog} key={blog.id} />
        ))}
      </TableBody>
    </Table>
  )
}

const Blog = ({ blog }) => {
  return (
    <TableRow key={blog.id}>
      <TableCell>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} - {blog.author}
        </Link>
      </TableCell>
      <TableCell>{blog.likes} Likes</TableCell>
      <TableCell>
        <Link to={`/users/${blog.user.id}`}>{blog.user.username}</Link>
      </TableCell>
    </TableRow>
  )
}

export default BlogList
