import React from 'react';
import './style.scss';
import { Button, Paper, useTheme } from '@mui/material';
import Diarista from '../../assets/images/diarista.png';

export default function ServiceCard() {
  const { palette } = useTheme();
  return (
    <Paper
      sx={{
        borderRadius: 4,
        minWidth: 220,
      }}
      elevation={3}
      className="service-card"
      mode={palette.mode}
    >
      <strong>Diarista</strong>
      <img src={Diarista} alt="diarista limpando" />
      <Button
        variant="contained"
        sx={{
          color: 'black',
          fontSize: '1rem',
          fontWeight: 600,
          borderRadius: 1.7,
        }}
      >
        Ver Preços
      </Button>
    </Paper>
  );
}
