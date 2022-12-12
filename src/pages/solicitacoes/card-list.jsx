import {
  Avatar,
  Badge,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { codStatusDescricao } from '../../utils/codigos';
import { showDate } from '../../utils/format';

export default function CardList({
  onClick,
  dados: {
    nome,
    linkFoto,
    codAtendimento,
    dataStatus,
    descricao,
    codStatus,
    email,
    avaliado,
  },
}) {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleConversar = async () => {
    try {
      setIsLoading(true);
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      // Só preciso de um usuário, então pego o primeiro
      querySnapshot.forEach((usuario) => {
        const prestador = usuario.data();
        navigate('/chat', {
          state: {
            prestador: {
              displayName: prestador.displayName,
              email: prestador.email,
              photoURL: prestador.photoURL,
              uid: prestador.uid,
            },
          },
        });
      });

      setIsLoading(false);
      // setTimeout(() => setIsLoading(false), 1000);
    } catch (erro) {
      console.log('erro', erro);
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    if (avaliado) return;
    onClick();
  };

  const { corMui, descricao: statusDescricao } = codStatusDescricao(codStatus);
  return (
    <>
      <Button
        sx={{
          mt: 2,
          maxWidth: '100%',
        }}
        onClick={handleConversar}
      >
        <Typography
          sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 1,
            textAlign: 'left',
            fontSize: 14,
          }}
          disabled={isLoading}
        >
          {isLoading ? 'Carregando...' : `Conversar com ${nome}`}
        </Typography>
      </Button>
      <Stack>
        <Badge
          badgeContent={avaliado ? 'Avaliado' : ''}
          color="secondary"
          variant={!avaliado ? 'dot' : 'standard'}
        >
          <Paper
            sx={{ p: 1, cursor: 'pointer', width: '100%' }}
            elevation={4}
            onClick={handleClick}
          >
            <Chip
              avatar={<Avatar alt={nome} src={linkFoto} />}
              sx={{ justifyContent: 'flex-start' }}
              label={nome}
            />
            <Stack sx={{ p: 1, textAlign: 'left' }}>
              <Stack
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  color: 'border.chat',
                }}
              >
                <Typography sx={{ fontSize: 12 }}>
                  Atendimento: {codAtendimento}
                </Typography>
                <Typography sx={{ fontSize: 12 }}>
                  {showDate(dataStatus)}
                </Typography>
              </Stack>

              <Typography
                sx={{
                  fontSize: 13.5,
                }}
              >
                {descricao}
              </Typography>
            </Stack>
            <Chip
              sx={{ maxWidth: 80, height: 20, fontSize: 10 }}
              variant="outlined"
              label={statusDescricao}
              color={corMui}
            />
          </Paper>
        </Badge>
      </Stack>
    </>
  );
}
