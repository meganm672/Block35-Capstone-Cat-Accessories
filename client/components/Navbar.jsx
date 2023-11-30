import React from 'react';
import { logout } from '../redux/authSlice';
import { useSelector, useDispatch } from 'react-redux';

//import Link as RouterLink for mui 
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import catIcon from '../../image/catIcon.png';

//import the mui components
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


const NavBar = () => {
  const { token, user } = useSelector(state => state.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


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
            id="demo-positioned-button"
            aria-controls={open ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, padding: 1, fontSize: 40, justifyContent: "center", verticalAlign: "center" }}>
            <img id="cat-logo" src={catIcon} /> Whisker World
          </Typography>
          {token ?
            (<Button
              color="inherit"
              onClick={() => {
                dispatch(logout())
                navigate('/')
              }}
            >Logout</Button>) :
            (<Button color="inherit" component={RouterLink} to="/register">Login or Register</Button>)}
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <MenuItem onClick={handleClose} component={RouterLink} to="/">Products</MenuItem>
            <MenuItem onClick={handleClose} component={RouterLink} to="/cart"><ShoppingCartIcon />Cart</MenuItem>
            {user?.admin && <MenuItem onClick={handleClose} component={RouterLink} to="/admin">Admin</MenuItem>}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar