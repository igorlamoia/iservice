import React from 'react';
import { Drawer, Stack } from '@mui/material';
import Navbar from './left-navbar';
import Search from './search';
import Chats from './chats';

function Sidebar({ sideberOpen, setSideberOpen, celular, drawerWidth }) {
  return (
    <Drawer
      PaperProps={{
        sx: {
          width: {
            xs: 300,
            sm: drawerWidth,
            backdropFilter: 'blur(20px)',
          },
          bgcolor: 'chatShape.translucent',
          border: 'none',
        },
        elevation: 2,
      }}
      anchor="left"
      open={drawerWidth !== '0px' || sideberOpen}
      sx={{
        width: drawerWidth,
        display: 'flex',
        height: '100vh',
      }}
      onClose={() => setSideberOpen(false)}
      variant={!celular ? 'persistent' : 'default'}
    >
      <Navbar />
      <Search />
      <Chats />
    </Drawer>
  );
}

export default Sidebar;
