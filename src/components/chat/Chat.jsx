import React from 'react';
import ListIcon from '@mui/icons-material/List';
import { IconButton } from '@mui/material';
import Cam from '../../assets/images/cam.png';
import Add from '../../assets/images/add.png';
import More from '../../assets/images/more.png';
import Messages from './Messages';
import Input from './Input';
import { useChatContext } from '../../hooks/context/ChatContext';

function Chat({ setSideberOpen }) {
  const { data } = useChatContext();

  return (
    <div className="chat">
      <div className="chatInfo">
        <IconButton onClick={() => setSideberOpen(true)}>
          <ListIcon />
        </IconButton>
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}

export default Chat;
