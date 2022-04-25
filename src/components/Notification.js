import { useSelector } from 'react-redux'
import * as React from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const [open, setOpen] = React.useState(false)

  // true false

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} sx={{ width: '100%' }}>
          {notification}
        </Alert>
      </Snackbar>
    </Stack>
  )
}

export default Notification
