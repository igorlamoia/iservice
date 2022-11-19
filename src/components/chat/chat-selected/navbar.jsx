import { IconButton, Paper, Chip, Skeleton } from '@mui/material';
import React from 'react';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import DEFAULT_AVATAR from '../../../assets/images/avatar-default.svg';

export function Navbar({ setSideberOpen, data }) {
  return (
    <Paper
      sx={{
        display: 'flex',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        backdropFilter: 'blur(3px)',
        marginLeft: { xs: 0, md: '330px' },
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 1,
        borderRadius: 0,
        height: '3.1rem',
        bgcolor: 'chatShape.main',
      }}
      elevation={2}
    >
      <IconButton
        sx={{ display: { xs: 'flex', md: 'none' } }}
        onClick={() => setSideberOpen(true)}
      >
        <PersonSearchIcon />
      </IconButton>
      <Chip
        variant="outlined"
        sx={{ border: '1px solid gray' }}
        avatar={
          <LazyLoadImage
            className="profile-img"
            height={24}
            effect="blur"
            src={data.user?.photoURL || DEFAULT_AVATAR}
            width={24}
            style={{ borderRadius: 100, objectFit: 'cover' }}
            placeholder={<Skeleton variant="circular" width={24} height={24} />}
          />
        }
        label={<span>{data.user?.displayName}</span>}
      />
    </Paper>
  );
}
