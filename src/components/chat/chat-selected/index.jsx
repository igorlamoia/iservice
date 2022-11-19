import React from 'react';
import { useTheme } from '@mui/material';
import Messages from './messages';
import Input from './input';
import { useChatContext } from '../../../hooks/context/ChatContext';
import { Navbar } from './navbar';

function Chat({ setSideberOpen, drawerWidth }) {
  const { data } = useChatContext();
  const { palette } = useTheme();

  return (
    <div className="chat">
      <Navbar setSideberOpen={setSideberOpen} data={data} />
      <Messages />
      <Input drawerWidth={drawerWidth} palette={palette} />
    </div>
  );
}

export default Chat;
