import React from 'react';
import './style.scss';
import { Box, Button, IconButton, Paper, Rating } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ReactComponent as LocationSVG } from '../../assets/location.svg';
import { ReactComponent as MoreSVG } from '../../assets/more.svg';

export default function WorkerCard({ user = {} }) {
  const { palette } = useTheme();

  return (
    <Paper
      sx={{
        overflow: 'hidden',
        borderRadius: 1.5,
        scrollSnapAlign: 'start',
        width: 300,
        minWidth: 290,
      }}
      className="card-body"
      mode={palette.mode}
      elevation={4}
    >
      <header className="profile">
        <img
          className="profile-img"
          src="https://images.unsplash.com/photo-1615906655593-ad0386982a0f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&h=120&q=100"
          alt="mecanico trabalhando"
          loading="lazy"
        />
        <div className="profile-info">
          <h5 className="profile-name">{user.nome ?? 'Chaulim'}</h5>
          <strong className="profession">
            {user.profissao ?? 'Açougueiro'}
          </strong>
          <Rating
            name="half-rating"
            defaultValue={4.5}
            value={4.0}
            precision={0.5}
            readOnly
          />
          <div className="location">
            <LocationSVG />
            <strong>
              {/* {!user.cidades?.lenght && 'Cataguases'} */}
              {user.cidades?.map((cidade) => cidade.nome)}
            </strong>
          </div>
        </div>
      </header>
      <div className="description">
        <h5>Descrição do profissional</h5>
        <p>
          {user.descricao ??
            `Faço serviços relacionados a Televisão, Ar condicionado, geladeira
          local ...`}
          <span>ver mais</span>
        </p>
      </div>
      <Box
        component="footer"
        sx={{
          bgcolor: 'shape.light',
          ...(palette.mode === 'dark' && {
            boxShadow: '0px 0px 5px var(--color-primary-dark)',
          }),
        }}
        className="card-footer"
        mode={palette.mode}
      >
        <IconButton
          className="more-info"
          sx={{
            bgcolor: palette.primary.main,
            transition: 'filter .3s ease',
            '&:hover': {
              bgcolor: palette.primary.dark,
              filter: `drop-shadow(0px 0px 0.6rem ${palette.primary.main})`,
            },
          }}
        >
          <MoreSVG />
        </IconButton>
        <h5>Avaliação mais recente</h5>
        <div className="review">
          <p>
            <strong>Roberto Silva:</strong> Excelentes profissionais, rápidos,
            honestos e com bom preços. Recomendo muito
          </p>
        </div>
        <Button
          variant="contained"
          sx={{
            color: 'black',
            fontWeight: 600,
            boxShadow: 0,
            borderRadius: 1.7,
            transition: 'transform .2s ease-in-out',
            '&:hover': {
              boxShadow: 0,
              bgcolor: palette.primary.dark,
              transform: 'scale(0.99)',
            },
          }}
        >
          Solicitar Orçamento
        </Button>
      </Box>
    </Paper>
  );
}
