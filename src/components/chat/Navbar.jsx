import React from 'react';
import { Button, Stack } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useAuthContext } from '../../hooks/context/AuthContext';
import { LogoTipo } from '../../pages/login';
import IserviceTypography from '../iservice-typography';

function Navbar() {
  const { currentUser } = useAuthContext();

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ p: 1, bgcolor: 'primary.main' }}
    >
      Bate papo
      {/* <div className="user"> */}
      {/* <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName} Lamoia Queiroz</span> */}
      {/* <Button variant="contained" onClick={() => signOut(auth)}>
          Sair
        </Button> */}
      {/* </div> */}
    </Stack>
  );
}

export default Navbar;
