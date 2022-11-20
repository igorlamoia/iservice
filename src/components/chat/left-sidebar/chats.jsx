import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Box, Chip, Skeleton, Stack, Typography } from '@mui/material';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { db } from '../../../firebase';
import { useAuthContext } from '../../../hooks/context/AuthContext';
import { useChatContext } from '../../../hooks/context/ChatContext';
import DEFAULT_AVATAR from '../../../assets/images/avatar-default.svg';
import {
  convertSecondsToDay,
  convertSecondsToHHMM,
} from '../../../utils/format';

function Chats({ setSideberOpen }) {
  const [chats, setChats] = useState([]);

  const { currentUser } = useAuthContext();
  const { dispatch } = useChatContext();

  useEffect(() => {
    const getChats = () => {
      // Chegam 2 posições no array, o uid [0] e os dados [1] p/ cada usuário
      console.log('currentUser', currentUser);
      const unsub = onSnapshot(
        doc(db, 'userChats', currentUser.uid),
        (objQuery) => {
          setChats(objQuery.data());
        }
      );

      return () => {
        unsub();
      };
    };
    if (currentUser.uid) {
      // console.log('buscando CHATTTT');
      getChats();
    }
    // currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    // u = { displayName, photoURL, uid }
    setSideberOpen(false);
    dispatch({ type: 'CHANGE_USER', payload: u });
  };

  return (
    <Box sx={{ overflowY: 'scroll' }}>
      {Object.entries(chats || [])
        ?.sort((a, b) => b[1].date - a[1].date)
        ?.map((chat) => (
          <Stack
            direction="row"
            alignItems="center"
            // justifyContent="space-between"
            className="userChat"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <Stack direction="row" alignItems="center">
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
            <Stack
              className="timeDate"
              sx={{ textAlign: 'end', color: 'border.chat' }}
            >
              <Typography variant="caption">
                {convertSecondsToDay(chat[1].date?.seconds)}
              </Typography>
              <Typography variant="caption">
                {convertSecondsToHHMM(chat[1].date?.seconds)}
              </Typography>
            </Stack>
          </Stack>
        ))}
    </Box>
  );
}

export default Chats;
