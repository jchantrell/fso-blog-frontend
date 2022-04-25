import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'

import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { setUser } from '../reducers/loginReducer'
import { displayNotification } from '../reducers/notificationReducer'

const Nav = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.login)

  const mainStyle = {
    textDecoration: 'none',
    color: 'white',
  }

  const subStyle = {
    textDecoration: 'none',
    color: 'inherit',
  }

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    setAnchorEl(null)
    window.localStorage.removeItem('user')
    dispatch(setUser(null))
    dispatch(displayNotification('Logged out'))
    navigate('/')
  }

  if (!user) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <Link style={subStyle} to={'/'}>
                <MenuItem onClick={handleClose}>Home</MenuItem>
              </Link>
              <Link style={subStyle} to={'/login'}>
                <MenuItem onClick={handleClose}>Login</MenuItem>
              </Link>
            </Menu>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              App
            </Typography>

            <Link style={mainStyle} to="/">
              <Button color="inherit">Discover</Button>
            </Link>
            <Link style={mainStyle} to="/users">
              <Button color="inherit">Users</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    )
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <Link style={subStyle} to={`/users/${user.id}`}>
              <MenuItem onClick={handleClose}>My Blogs</MenuItem>
            </Link>

            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            App
          </Typography>

          <Link style={mainStyle} to="/">
            <Button color="inherit">Discover</Button>
          </Link>
          <Link style={mainStyle} to="/users">
            <Button color="inherit">Users</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Nav
