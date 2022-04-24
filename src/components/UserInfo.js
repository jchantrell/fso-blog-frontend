import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const UserInfo = () => {
  const id = useParams().id
  const users = useSelector((state) => state.users)
  if (!users) {
    return null
  }
  const user = users.find((u) => u.id === id)
  const blogs = user.blogs

  return (
    <div>
      <h2>User: {user.username}</h2>
      <div>{`List of ${user.name}'s Blogs`}</div>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserInfo
