import { Autocomplete, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { api } from '../../utils/api';
export default function WorkerRegister() {
  const [cidades, setCidades] = useState([]);

  // useEffect(() => {
  //   fetch(
  //     'https://servicodados.ibge.gov.br/api/v1/localidades/estados/31/distritos'
  //   )
  //     .then((dados) => dados.json())
  //     .then((data) => setCidades(data));
  // }, []);

  return (
    <Box
      sx={{
        p: 5,
        width: '100vw',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Autocomplete
        options={cidades}
        getOptionLabel={(opcao) => opcao.nome}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Buscar cidade" />
        )}
      />
    </Box>
  );
}
