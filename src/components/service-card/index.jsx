import React from 'react';
import './style.scss';
import { Paper, useTheme } from '@mui/material';
import Diarista from '../../assets/images/diarista.png';

export default function ServiceCard() {
  const { palette } = useTheme();
  return (
    <Paper
      sx={{
        borderRadius: 2,
        bgcolor: palette.mode === 'dark' && 'rgba(0,0,0,0.9)',
        minWidth: 170,
      }}
      elevation={4}
      className="service-card"
      mode={palette.mode}
    >
      <strong>Diarista</strong>
      <img src={Diarista} alt="diarista limpando" />
      <button>Ver Preços</button>
    </Paper>
  );
}
