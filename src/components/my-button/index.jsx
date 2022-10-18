/* eslint-disable react/jsx-props-no-spreading */
import { Button, Typography } from '@mui/material';
import React from 'react';

export default function MyBytton({
  sx,
  variant = 'contained',
  children,
  ...rest
}) {
  return (
    <Button
      variant={variant}
      sx={({ palette }) => ({
        color: 'black',
        boxShadow: 0,
        borderRadius: 1.7,
        minHeight: 45,
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
      <Typography sx={{ fontWeight: 600 }}>{children}</Typography>
    </Button>
  );
}
