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
        minWidth: 170,
        boxShadow:
          '0px 2px 4px -1px rgb(150 150 150 / 20%), 0px 4px 5px 0px rgb(150 150 150 / 14%), 0px 1px 10px 0px rgb(150 150 150 / 12%)',
      }}
      elevation={4}
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
