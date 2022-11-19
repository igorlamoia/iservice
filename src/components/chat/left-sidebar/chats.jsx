import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { db } from '../../../firebase';
import { useAuthContext } from '../../../hooks/context/AuthContext';
import { useChatContext } from '../../../hooks/context/ChatContext';
import DEFAULT_AVATAR from '../../../assets/images/avatar-default.svg';
import { Box, Skeleton, Stack } from '@mui/material';

function Chats() {
  const [chats, setChats] = useState([]);

  const { currentUser } = useAuthContext();
  const { dispatch } = useChatContext();

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: 'CHANGE_USER', payload: u });
  };

  return (
    <Box sx={{ overflowY: 'scroll' }}>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <Stack
            direction="row"
            alignItems="center"
            // justifyContent="space-between"
            className="userChat"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <LazyLoadImage
              className="profile-img"
              // height={24}
              effect="blur"
              src={chat[1].userInfo.photoURL || DEFAULT_AVATAR}
              // width={24}
              style={{ borderRadius: 100, objectFit: 'cover' }}
              placeholder={<Skeleton variant="circular" />}
            />
            <div className="userChatInfo">
              <span>{chat[1].userInfo.displayName}</span>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
          </Stack>
        ))}
    </Box>
  );
}

export default Chats;
