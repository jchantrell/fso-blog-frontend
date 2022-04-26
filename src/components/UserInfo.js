import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const UserInfo = () => {
  const id = useParams().id
  const users = useSelector((state) => state.users)
  const currentUser = useSelector((state) => state.login)
  if (!users) {
    return null
  }
  const user = users.find((u) => u.id === id)

  const blogs = [...user.blogs]

  console.log(user)

  if (!currentUser) {
    return (
      <div>
        <h2>User: {user.username}</h2>
        <div>{`List of ${user.username}'s Blogs`}</div>
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title} by {blog.author}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
  if (user.username === currentUser.username) {
    return (
      <div>
        <h2>User: {user.username}</h2>
        <div>{'List of your blogs'}</div>
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title} by {blog.author}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div>
      <h2>User: {user.username}</h2>
      <div>{`List of ${user.username}'s Blogs`}</div>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserInfo
