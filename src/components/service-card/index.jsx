import React from 'react';
import './style.scss';
import Diarista from '../../assets/images/diarista.png';
import { useTheme } from '@mui/material';

export default function ServiceCard() {
  const { palette } = useTheme();
  return (
    <div className="service-card" mode={palette.mode}>
      <strong>Diarista</strong>
      <img src={Diarista} alt="diarista limpando" />
      <button>Ver Preços</button>
    </div>
  );
}
