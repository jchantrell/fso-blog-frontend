import { useDispatch } from 'react-redux'
import { removeBlog } from '../reducers/blogReducer'
import { displayNotification } from '../reducers/notificationReducer'

const DeleteButton = ({ blog }) => {
  console.log(blog)
  const dispatch = useDispatch()
  return (
    <button
      onClick={() => {
        if (
          window.confirm(
            `Do you want to remove ${blog.title} by ${blog.author}?`
          )
        ) {
          dispatch(displayNotification(`Removed ${blog.title}`))
          dispatch(removeBlog(blog))
        }
      }}
    >
      remove
    </button>
  )
}
export default DeleteButton
