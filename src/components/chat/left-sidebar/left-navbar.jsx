import React from 'react';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';
import { useAuthContext } from '../../../hooks/context/AuthContext';
import { LogoTipo } from '../../../pages/login';
import IserviceTypography from '../../iservice-typography';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();

  return (
    <Paper
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        p: 1,
        bgcolor: 'chatShape.main',
        height: '3.1rem',
        borderRadius: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      elevation={1}
    >
      <LazyLoadImage
        effect="blur"
        src={currentUser.photoURL} // use normal <img> attributes as props
        width={35}
        height={35}
        style={{ borderRadius: '50%', objectFit: 'cover' }}
      />
      <Typography>Bate papo</Typography>
      <div className="user">
        <Button
          sx={{ boxShadow: 'none' }}
          variant="contained"
          onClick={() => navigate('/')}
        >
          Sair
        </Button>
        {/* <span>{currentUser.displayName} Lamoia Queiroz</span> */}
      </div>
    </Paper>
  );
}

export default Navbar;
