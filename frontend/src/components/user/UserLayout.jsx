import React from 'react';
import { Box, Toolbar } from '@mui/material';
import UserSidebar from './UserSidebar';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <UserSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default UserLayout;
