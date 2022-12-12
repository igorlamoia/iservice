import React from 'react';
import Button from '@mui/material/Button';
import { CircularProgress, Stack } from '@mui/material';
import { api } from '../../utils/api';
import { useInteractivityContext } from '../../hooks/context/interactivityContext';

export function MenuOptions({
  opcoes,
  isLoading,
  setIsLoading,
  codAtendimento,
  setChoosedDemanda,
  demandas,
  setDemandas,
}) {
  const { setInteractivityError, setInteractivitySuccess } =
    useInteractivityContext();

  const handleAtualizarstatusDemanda = async (codStatus) => {
    try {
      setIsLoading(true);
      const { data } = await api.put('atualizar/status-atendimento', {
        codAtendimento,
        codStatus,
      });

      const novasDemandas = demandas.map((demanda) => {
        if (demanda.codAtendimento === codAtendimento) {
          return { ...demanda, codStatus };
        }
        return demanda;
      });

      setDemandas(novasDemandas);
      setIsLoading(false);
      setChoosedDemanda({});
      setInteractivitySuccess(data.mensagem);
    } catch (error) {
      setInteractivityError(error.response?.data?.mensagem || 'Falha na API');
      setIsLoading(false);
    }
  };

  return (
    <Stack>
      {isLoading ? (
        <CircularProgress sx={{ m: 'auto' }} size={24} color="secondary" />
      ) : (
        opcoes?.map((opcao) => (
          <Button onClick={() => handleAtualizarstatusDemanda(opcao.id)}>
            {opcao.label}
          </Button>
        ))
      )}
    </Stack>
  );
}
