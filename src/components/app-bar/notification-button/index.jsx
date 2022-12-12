import React, { useEffect, useState } from 'react';

import Notification from '@mui/icons-material/NotificationsNoneSharp';
import {
  Fade,
  Menu,
  Button,
  Stack,
  Badge,
  styled,
  CircularProgress,
  Typography,
} from '@mui/material';
import { api } from '../../../utils/api';
import { DemandaPendenteItem } from './demandas';
import { NotificationItem } from './notification-messages';

export function NotifyIcon({ logedUser }) {
  const [demandas, setDemandas] = useState([]);
  const [notification, setNotification] = useState([]);
  const [isLoadingNotification, setIsLoadingNotification] = useState(true);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const demandasPendentes = demandas.filter(
    (demanda) => demanda.codStatus == 1
  );
  const notificationPendentes = notification.filter(
    (demanda) => demanda.visualizada == 0
  );

  // const getSolicitacoes = async () => {
  //   try {
  //     setIsLoadingNotification(true);
  //     const { data } = await api.get(
  //       `listar/solicitacoes-usuario?codUsuario=${logedUser.codUsuario}`
  //     );
  //     setDemandas((oldState) => [...oldState, ...data.payload]);
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsLoadingNotification(false);
  //   }
  // };

  const getDemandas = async () => {
    try {
      setIsLoadingNotification(true);
      const { data } = await api.get(
        `listar/demandas-prestador?codUsuario=${logedUser.codUsuario}`
      );
      setDemandas(data.payload);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingNotification(false);
    }
  };

  const getNotification = async () => {
    try {
      setIsLoadingNotification(true);
      const { data } = await api.get(
        `notificacao/listar?codUsuario=${logedUser.codUsuario}`
      );
      setNotification(data.payload);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingNotification(false);
    }
  };

  useEffect(() => {
    getDemandas();
    getNotification();
    // getSolicitacoes();
  }, []);

  const numberNotifications =
    demandasPendentes.length + notificationPendentes.length;

  return (
    <>
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <StyledBadge badgeContent={numberNotifications} color="secondary">
          <Notification />
        </StyledBadge>
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        PaperProps={{
          sx: { bgcolor: 'background.default', p: 0 },
        }}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <Stack>
          {isLoadingNotification && (
            <CircularProgress color="secondary" sx={{ m: 'auto' }} size={24} />
          )}
          {demandasPendentes?.map((demanda) => (
            <DemandaPendenteItem
              key={demanda.codAtendimento}
              demanda={demanda}
            />
          ))}
          {notificationPendentes?.map((notificacao) => (
            <NotificationItem
              notificacao={notificacao}
              notification={notification}
              setNotification={setNotification}
            />
          ))}
          {numberNotifications === 0 && (
            <Typography sx={{ textAlign: 'center', p: 1 }} variant="body2">
              Caixa vazia
            </Typography>
          )}
        </Stack>
      </Menu>
    </>
  );
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));
