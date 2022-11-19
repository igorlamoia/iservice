import React, { useEffect, useState } from 'react';
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { v4 as uuid } from 'uuid';
import SendIcon from '@mui/icons-material/Send';
import { Box, Button, IconButton, Paper, TextField } from '@mui/material';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Img from '../../../assets/images/img.png';
import Attach from '../../../assets/images/attach.png';
import { db, storage } from '../../../firebase';
import { useAuthContext } from '../../../hooks/context/AuthContext';
import { useChatContext } from '../../../hooks/context/ChatContext';

function Input({ drawerWidth, palette }) {
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setimagePreview] = useState(null);

  const { currentUser } = useAuthContext();
  const { data } = useChatContext();

  const handleSend = async () => {
    if (text.trim() === '' && !img) return;
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          // TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, 'chats', data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, 'chats', data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
    setSelectedFile(null);
    setimagePreview(null);
    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [`${data.chatId}.lastMessage`]: {
        text,
      },
      [`${data.chatId}.date`]: serverTimestamp(),
    });

    await updateDoc(doc(db, 'userChats', data.user.uid), {
      [`${data.chatId}.lastMessage`]: {
        text,
      },
      [`${data.chatId}.date`]: serverTimestamp(),
    });

    setText('');
    setImg(null);
  };

  // UseEffect para foto preview
  useEffect(() => {
    if (!selectedFile) {
      setimagePreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setimagePreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  // change profile image
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  return (
    <Paper
      sx={{
        ml: drawerWidth,
        backdropFilter: 'blur(2px)',
        bgcolor: 'chatShape.main',
        borderRadius: 0,
      }}
      elevation={2}
      className="input"
    >
      <TextField
        type="text"
        placeholder="Mensagem"
        sx={{ width: '100%' }}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        value={text}
      />
      <div className="send">
        {/* <img src={Attach} alt="" /> */}
        <input
          type="file"
          style={{ display: 'none' }}
          id="file"
          onChange={(e) => {
            onSelectFile(e);
            setImg(e.target.files[0]);
          }}
        />
        <label htmlFor="file" style={{ cursor: 'pointer' }}>
          <SendPhotoComponent imagePreview={imagePreview} />
        </label>
        <Button onClick={handleSend}>
          <SendIcon />
        </Button>
      </div>
    </Paper>
  );
}

export default Input;

function SendPhotoComponent({ imagePreview }) {
  if (imagePreview) {
    return (
      <LazyLoadImage
        effect="blur"
        src={imagePreview} // use normal <img> attributes as props
        width={40}
        height={40}
        style={{ borderRadius: '50%', objectFit: 'cover' }}
      />
    );
  }

  return <AddPhotoAlternateIcon />;
}
