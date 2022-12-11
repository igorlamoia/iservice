import { useTheme } from '@emotion/react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
  Toolbar,
  useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import { filtrarOpcoes } from '../../utils/codigos';
import { MenuOptions } from './menu-options';

const opcoesGeraisPrestador = [
  { id: 1, label: 'Voltar para Pendente' },
  { id: 2, label: 'Aceitar Solicitação' },
  { id: 3, label: 'Recusar Solicitação' },
  { id: 4, label: 'Cancelar Solicitação' },
  { id: 6, label: 'Finalizar Solicitação' },
];

export default function ModalDemanda({
  demanda,
  setChoosedDemanda,
  demandas,
  setDemandas,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    if (isLoading) return;
    setChoosedDemanda({});
  };

  const opcoes = filtrarOpcoes(demanda);

  return (
    <Dialog
      fullScreen={fullScreen}
      open
      onClose={handleClose}
      // TransitionComponent={Transition}
      PaperProps={{
        sx: {
          bgcolor: 'background.default',
          boxShadow: 8,
          borderRadius: 2,
          py: 2,
        },
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'flex-end',
        }}
      >
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <DialogTitle
        sx={{
          fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.5rem' },
          textAlign: 'center',
          width: '70%',
          margin: 'auto',
        }}
      >
        Altere o status da demanda{' '}
        <ITypography>{demanda?.codAtendimento}</ITypography>
      </DialogTitle>
      <DialogContent>
        <MenuOptions
          codAtendimento={demanda?.codAtendimento}
          opcoes={opcoes}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setChoosedDemanda={setChoosedDemanda}
          demandas={demandas}
          setDemandas={setDemandas}
        />
      </DialogContent>
    </Dialog>
  );
}

const ITypography = styled('span')`
  color: ${({ theme }) => theme.palette.secondary.main};
`;
