import { Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useAuthContext } from '../../../hooks/context/AuthContext';
import { useChatContext } from '../../../hooks/context/ChatContext';

function Message({ message }) {
  const { currentUser } = useAuthContext();
  const { data } = useChatContext();

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && 'owner'}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>Enviada</span>
      </div>
      <div className="messageContent">
        <Typography>{message.text}</Typography>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
}

export default Message;
