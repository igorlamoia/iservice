import React from 'react';
import ListIcon from '@mui/icons-material/List';
import { IconButton, Skeleton } from '@mui/material';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Cam from '../../../assets/images/cam.png';
import Add from '../../../assets/images/add.png';
import More from '../../../assets/images/more.png';
import Messages from './messages';
import Input from './input';
import { useChatContext } from '../../../hooks/context/ChatContext';
import DEFAULT_AVATAR from '../../../assets/images/avatar-default.svg';

function Chat({ setSideberOpen, drawerWidth }) {
  const { data } = useChatContext();

  return (
    <div className="chat">
      <div className="chatInfo">
        <IconButton onClick={() => setSideberOpen(true)}>
          <ListIcon />
        </IconButton>
        <LazyLoadImage
          className="profile-img"
          height={40}
          effect="blur"
          src={data.user?.photoURL || DEFAULT_AVATAR}
          width={40}
          style={{ borderRadius: 100, objectFit: 'cover' }}
          placeholder={<Skeleton variant="circular" width={40} height={40} />}
        />
        <span>{data.user?.displayName}</span>
        {/* <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div> */}
      </div>
      <Messages />
      <Input drawerWidth={drawerWidth} />
    </div>
  );
}

export default Chat;
