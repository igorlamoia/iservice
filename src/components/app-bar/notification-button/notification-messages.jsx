import { Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { useInteractivityContext } from '../../../hooks/context/interactivityContext';
import { api } from '../../../utils/api';
import { showDate } from '../../../utils/format';

export function NotificationItem({
  notificacao: {
    texto,
    createdAt,
    fk_Atendimento_codAtendimento,
    idNotificacao,
  },
  notification,
  setNotification,
}) {
  const { setInteractivityError, setInteractivitySuccess } =
    useInteractivityContext();

  const handleNotificationVisualizada = async (id) => {
    try {
      const { data } = await api.put('notificacao/visualizar', {
        idNotificacao: id,
      });
      setNotification(notification.filter((item) => item.idNotificacao !== id));
      setInteractivitySuccess(data.mensagem);
    } catch (error) {
      setInteractivityError(error.response?.data?.mensagem || 'Falha na api');
    }
  };
  return (
    <Button onClick={() => handleNotificationVisualizada(idNotificacao)}>
      <Stack
        sx={{
          maxWidth: 250,
          p: 1,
          textAlign: 'left',
          minWidth: '100%',
        }}
      >
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            color: 'border.chat',
          }}
        >
          <Typography sx={{ fontSize: 12 }}>
            Atendimento: {fk_Atendimento_codAtendimento}
          </Typography>
          <Typography sx={{ fontSize: 12 }}>{showDate(createdAt)}</Typography>
        </Stack>
        <Typography
          sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            fontSize: 13.5,
          }}
        >
          {texto}
        </Typography>
      </Stack>
    </Button>
  );
}
