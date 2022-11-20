import React, { useEffect, useState } from 'react';
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
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../../../firebase';
import { useAuthContext } from '../../../hooks/context/AuthContext';
import DEFAULT_AVATAR from '../../../assets/images/avatar-default.svg';
import { useChatContext } from '../../../hooks/context/ChatContext';

function Search({ setSideberOpen }) {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useAuthContext();
  const { dispatch } = useChatContext();

  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = async () => {
    const q = query(
      collection(db, 'users'),
      where('displayName', '==', username)
    );

    let usuarios = []; // Usuários encontrados

    try {
      setLoading(true);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((objQuery) => {
        usuarios = [...usuarios, objQuery.data()];
      });
      setUsers(usuarios); // Pega todos os usuários encontrados
    } catch (erro) {
      setErr(true);
    } finally {
      setLoading(false);
    }
    // console.log('dados', usuarios);

    if (usuarios.length === 0) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    setErr(false);

    if (e.key === 'Enter') {
      setUsers([]);
      handleSearch();
    }
  };

  // Preciso disso no handleSelect:
  // displayName : "teste"
  // email : "teste@s.com"
  // photoURL : null
  // uid : "IUWO8glD8qbbstrS8P9UcqzlvwZ2"
  const handleSelect = async (userSelected) => {
    navigate(location.pathname, {});
    // console.log('chamou');
    setErr(false);
    // console.log('tirei o users uai');
    // check whether the group(chats in firestore) exists, if not create
    setLoading(true);
    const combinedId =
      currentUser.uid > userSelected.uid
        ? currentUser.uid + userSelected.uid
        : userSelected.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, 'chats', combinedId));

      if (!res.exists()) {
        // create a chat in chats collection
        await setDoc(doc(db, 'chats', combinedId), { messages: [] });

        // create userSelected chats
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [`${combinedId}.userInfo`]: {
            uid: userSelected.uid,
            displayName: userSelected.displayName,
            photoURL: userSelected.photoURL,
          },
          [`${combinedId}.date`]: serverTimestamp(),
        });

        await updateDoc(doc(db, 'userChats', userSelected.uid), {
          [`${combinedId}.userInfo`]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [`${combinedId}.date`]: serverTimestamp(),
        });
      }
      setSideberOpen(false);
      dispatch({
        type: 'CHANGE_USER',
        payload: {
          uid: userSelected.uid,
          displayName: userSelected.displayName,
          photoURL: userSelected.photoURL,
        },
      });
    } catch (erro) {
      console.log(erro);
      console.log(erro.code);
      console.log(erro.message);
    } finally {
      setLoading(false);
    }

    setUsers([]); // Limpa a lista de usuários
    setUsername(''); // Limpa o campo de busca
  };

  const { state } = useLocation();

  useEffect(() => {
    // console.log('state?.prestador', state?.prestador);
    if (state?.prestador) handleSelect(state?.prestador);
  }, [state]);

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
            endAdornment: loading ? (
              <CircularProgress color="secondary" size={20} />
            ) : null,
          }}
        />
      </div>
      {err && (
        <Stack>
          <Typography
            variant="caption"
            sx={{ textAlign: 'center', color: 'border.chat' }}
          >
            Usuário não encontrado
          </Typography>
        </Stack>
      )}
      {users.length > 0 && (
        <Stack
          sx={{ overflowX: 'auto', px: 4 }}
          direction="row"
          className="userChat"
        >
          {users.map((user) => (
            <Button key={user.uid} onClick={() => handleSelect(user)}>
              <LazyLoadImage
                className="profile-img"
                effect="blur"
                src={user.photoURL || DEFAULT_AVATAR}
                style={{ borderRadius: 100, objectFit: 'cover' }}
                placeholder={
                  <Skeleton variant="circular" width={30} height={30} />
                }
              />
              <div className="userChatInfo">
                <span>{user.displayName}</span>
              </div>
            </Button>
          ))}
        </Stack>
      )}
    </div>
  );
}

export default Search;
