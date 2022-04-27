import * as React from 'react'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { showBlogForm } from '../reducers/showBlogFormReducer'
import { displayNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 5,
  p: 4,
  borderRadius: 10,
}

const BlogForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const open = useSelector((state) => state.showBlogForm)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleClose = () => {
    dispatch(showBlogForm(false))
  }

  const addBlog = async (event) => {
    event.preventDefault()

    const blog = {
      title: title,
      author: author,
      url: url,
    }

    setTitle('')
    setAuthor('')
    setUrl('')
    dispatch(displayNotification(`Added ${title} by ${author}`, 5))
    dispatch(createBlog(blog))
    navigate('/')
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={addBlog}>
            <Grid
              container
              alignItems="center"
              justify="center"
              direction="column"
              gap="15px"
            >
              <Grid item>
                <TextField
                  id="title-input"
                  name="title"
                  label="Title"
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="author-input"
                  name="author"
                  label="Author"
                  type="text"
                  value={author}
                  onChange={handleAuthorChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  id="url-input"
                  name="url"
                  label="URL"
                  type="text"
                  value={url}
                  onChange={handleUrlChange}
                />
              </Grid>

              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default BlogForm
