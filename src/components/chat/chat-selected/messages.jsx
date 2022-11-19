import { Box, Stack } from '@mui/material';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { useChatContext } from '../../../hooks/context/ChatContext';
import Message from './message';
import backgroundChatDarkSVG from '../../../assets/images/background-chat-gradient.svg';
import backgroundChatLightSVG from '../../../assets/images/background-chat-gradient-light.svg';

function Messages({ mode }) {
  const [messages, setMessages] = useState([]);
  const { data } = useChatContext();

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  console.log(messages);

  return (
    <Stack
      sx={{
        // bgcolor: 'background.paper',
        backgroundImage: `url(${
          mode ? backgroundChatLightSVG : backgroundChatDarkSVG
        })`,
        // bgcolor: 'red',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        height: '100%',
        my: '50px',
      }}
      className="messages"
    >
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </Stack>
  );
}

export default Messages;
