import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from 'firebase/firestore';
import { InputAdornment, Skeleton, TextField } from '@mui/material';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { db } from '../../../firebase';
import { useAuthContext } from '../../../hooks/context/AuthContext';
import DEFAULT_AVATAR from '../../../assets/images/avatar-default.svg';

function Search() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useAuthContext();

  const handleSearch = async () => {
    const q = query(
      collection(db, 'users'),
      where('displayName', '==', username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === 'Enter' && handleSearch();
  };

  const handleSelect = async () => {
    // check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, 'chats', combinedId));

      if (!res.exists()) {
        // create a chat in chats collection
        await setDoc(doc(db, 'chats', combinedId), { messages: [] });

        // create user chats
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [`${combinedId}.userInfo`]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [`${combinedId}.date`]: serverTimestamp(),
        });

        await updateDoc(doc(db, 'userChats', user.uid), {
          [`${combinedId}.userInfo`]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [`${combinedId}.date`]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername('');
  };
  return (
    <div className="search">
      <div className="searchForm">
        <TextField
          type="text"
          sx={{ width: '100%' }}
          placeholder="Encontrar usuário"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
      {err && <span>Usuário não encontrado</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <LazyLoadImage
            className="profile-img"
            height={40}
            effect="blur"
            src={user.photoURL || DEFAULT_AVATAR}
            width={40}
            style={{ borderRadius: 100, objectFit: 'cover' }}
            placeholder={<Skeleton variant="circular" width={40} height={40} />}
          />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
