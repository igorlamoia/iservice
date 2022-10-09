import React from 'react';
import { Box, Rating } from '@mui/material';
import './style.scss';
import { ReactComponent as LocationSVG } from '../../assets/location.svg';
import { ReactComponent as MoreSVG } from '../../assets/more.svg';

export default function WorkerCard() {
  return (
    <Box sx={{ boxShadow: 6 }} className="card-body">
      <header className="profile">
        <img
          className="profile-img"
          src="https://images.unsplash.com/photo-1615906655593-ad0386982a0f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&h=120&q=100"
          alt="mecanico trabalhando"
        />
        <div className="profile-info">
          <h5 className="profile-name">Chaulim</h5>
          <strong className="profession">Açougueiro</strong>
          <Rating
            name="half-rating"
            defaultValue={4.5}
            value={4.0}
            precision={0.5}
            readOnly
          />
          <div className="location">
            <LocationSVG />
            <strong>Cataguases-MG</strong>
          </div>
        </div>
      </header>
      <div className="description">
        <h5>Descrição do profissional</h5>
        <p>
          Faço serviços relacionados a Televisão, Ar condicionado, Aparelho de
          Som, DVD / Blu-Ray, Home theater, Vídeo game, Câmera. Estou local...
          <span>ver mais</span>
        </p>
      </div>
      <footer className="card-footer">
        <button type="button" className="more-info">
          <MoreSVG />
        </button>
        <h5>Avaliação mais recente</h5>
        <div className="review">
          <p>
            <strong>Roberto Silva:</strong> Excelentes profissionais, rápidos,
            honestos e com bom preços. Recomendo muito
          </p>
        </div>
        <button type="button">Solicitar Orçamento</button>
      </footer>
    </Box>
  );
}
