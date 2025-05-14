import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';

export const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#212121' }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 'bold',
          }}
        >
          Home
        </Typography>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          <Button
            color="inherit"
            component={RouterLink}
            to="/login"
          >
            Login
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/register"
          >
            Register
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
