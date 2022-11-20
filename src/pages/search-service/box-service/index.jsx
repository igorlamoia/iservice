import { Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import LottieAnimacao from 'lottie-react';
import LottieLightModeWorker from '../../../assets/lightModeWorker.json';
import LottieDarkModeWorker from '../../../assets/darkModeWorker.json';

function TitleService({ service = {} }) {
  if (service.descricao) {
    return <>PRECISANDO DE {service.descricao}?</>;
  }
  if (service.nomeEspecialidade) {
    return <>PRECISANDO DE {service.nomeEspecialidade}?</>;
  }
  if (service.nomeCategoria) {
    return <>PRECISANDO DE {service.nomeCategoria}?</>;
  }
  return (
    <>PRECISANDO DE ALGUM SERVIÇO? SELECIONE ALGUMA DAS OPÇÕES QUE TEMOS</>
  );
}

export function BoxService({ service = {} }) {
  const { palette } = useTheme();
  const { mode } = palette;

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ my: 2 }}
    >
      <Stack>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            textTransform: 'uppercase',
            fontSize: {
              xs: '1.1rem',
              sm: '1.5rem',
              lg: '2rem',
            },
          }}
        >
          <TitleService service={service} />
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: 'border.main',
            fontSize: {
              xs: '1rem',
              sm: '1rem',
            },
          }}
        >
          Veja abaixo algumas as opções que melhor te atende
        </Typography>
      </Stack>
      <Stack
        direction="row"
        sx={{
          display: { xs: 'none', sm: 'flex' },
          width: '50%',
          justifyContent: 'center',
        }}
      >
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          sx={{ position: 'relative', width: '100%' }}
        >
          <LottieAnimacao
            style={{ height: 200 }}
            autoplay={false} // TODO - colocar interativo
            animationData={
              mode === 'light' ? LottieLightModeWorker : LottieDarkModeWorker
            }
          />
        </Stack>
      </Stack>
      {/* <LottieAnimacao animationData={T2} /> */}
    </Stack>
  );
}
