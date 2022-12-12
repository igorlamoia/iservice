import { Button, Stack, TextareaAutosize, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { StarRating } from '../../components';
import { useInteractivityContext } from '../../hooks/context/interactivityContext';
import { api } from '../../utils/api';

export function AvaliarUsuario({ demanda, handleClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const textoRef = useRef(null);
  const ratingRef = useRef({});

  const { setInteractivityError, setInteractivitySuccess } =
    useInteractivityContext();

  const handleRating = (rating) => {
    ratingRef.current.value = rating;
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.post('avaliar/prestador', {
        codPrestador: demanda.fk_DemandaEscolher_codPrestador,
        codAtendimento: demanda.codAtendimento,
        texto: textoRef.current.value,
        avaliacao: ratingRef.current.value,
      });
      setInteractivitySuccess(data.mensagem);
      setIsLoading(false);
      handleClose();
    } catch (error) {
      setInteractivityError(error.response?.data?.mensagem || 'Falha na API');
      setIsLoading(false);
    }
  };

  return (
    <Stack sx={{ minWidth: 300 }}>
      <Typography>Dê uma nota para o prestador:</Typography>
      <StarRating handleRating={handleRating} />

      <Typography sx={{ mt: 2 }}>Como foi?</Typography>

      <TextareaAutosize
        aria-label="minimum height"
        value={textoRef?.current?.value}
        ref={textoRef}
        name="descricao"
        minRows={5}
        placeholder="Descreva sua experiência com o prestador de serviço. O que você gostou? O que você não gostou? O que poderia ser melhorado? O que você recomendaria para outras pessoas?"
        style={{
          fontFamily: 'Quicksand',
          borderRadius: '0.5rem',
          backgroundColor: 'transparent',
          minWidth: '100%',
          maxWidth: '100%',
          fontSize: '1rem',
          padding: 10,
        }}
      />

      <Button
        disabled={isLoading}
        onClick={handleSubmit}
        sx={{
          bgcolor: 'primary.main',
          mt: 5,
          '&:hover': { bgcolor: 'primary.dark' },
        }}
      >
        <Typography>{isLoading ? 'Carregando...' : 'Enviar'}</Typography>
      </Button>
    </Stack>
  );
}
