/* eslint-disable react/jsx-props-no-spreading */
import { Button, Typography, CircularProgress } from '@mui/material';
import React from 'react';

export default function MyBytton({
  sx,
  variant = 'contained',
  children,
  isLoading,
  ...rest
}) {
  return (
    <Button
      variant={variant}
      sx={({ palette }) => ({
        color: 'black',
        boxShadow: 0,
        width: '100%',
        borderRadius: 1.7,
        minHeight: 45,
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'transform .2s ease',
        '&:hover': {
          boxShadow: 0,
          bgcolor: palette.primary.dark,
          transform: 'scale(0.99)',
        },
        ...sx,
      })}
      {...rest}
    >
      <Typography sx={{ fontWeight: 600 }}>
        {isLoading ? <CircularProgress size={20} /> : children}
      </Typography>
    </Button>
  );
}
