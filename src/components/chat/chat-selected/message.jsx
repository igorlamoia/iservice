import { Paper, Skeleton, Typography, useTheme } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useAuthContext } from '../../../hooks/context/AuthContext';
import { useChatContext } from '../../../hooks/context/ChatContext';
import DEFAULT_AVATAR from '../../../assets/images/avatar-default.svg';

function Message({ message }) {
  const {
    palette: { mode },
  } = useTheme();

  const { currentUser } = useAuthContext();
  const { data } = useChatContext();

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  // console.log(mode);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && 'owner'}`}
    >
      <div className="messageInfo">
        <LazyLoadImage
          className="profile-img"
          height={40}
          effect="blur"
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL || DEFAULT_AVATAR
          }
          width={40}
          style={{ borderRadius: 100, objectFit: 'cover' }}
          placeholder={<Skeleton variant="circular" width={40} height={40} />}
        />
        {/* <span style={{ zIndex: 200 }}>Enviada</span> */}
      </div>
      <Paper
        sx={{
          borderRadius: '10px 0px 10px 10px',
          height: 'fit-content',
          // p: 1,
          ...(message.img && {
            // bgcolor: 'var(--color-primary-dark)'
            bgcolor: 'transparent',
          }),
        }}
        className="messageContent"
        elevation={1}
        {...(message.img && { elevation: 0 })}
      >
        <Typography tema={`${mode}`} tipo={message.img ? 'img' : ''}>
          {message.text}
        </Typography>
        {message.img && <img src={message.img} alt="" />}
      </Paper>
    </div>
  );
}

export default Message;
