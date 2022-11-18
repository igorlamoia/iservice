import React from 'react';
import Navbar from './Navbar';
import Search from './Search';
import Chats from './Chats';
import { Drawer } from '@mui/material';

function Sidebar({ sideberOpen, setSideberOpen }) {
  return (
    <Drawer
      anchor="left"
      open={sideberOpen}
      onClose={() => setSideberOpen(false)}
    >
      <div className="sidebar">
        <Navbar />
        <Search />
        <Chats />
      </div>
    </Drawer>
  );
}

export default Sidebar;
