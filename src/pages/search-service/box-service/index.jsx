import { Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import LottieAnimacao from 'lottie-react';
import LottieLightModeWorker from '../../../assets/lightModeWorker.json';
import LottieDarkModeWorker from '../../../assets/darkModeWorker.json';
import FerramentaLight from '../../../assets/ferramentaLight.json';

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
      sx={{ mt: 2 }}
    >
      <Stack>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            textTransform: 'uppercase',
            fontSize: {
              xs: '1.5rem',
              sm: '1.7rem',
              lg: '2.2rem',
            },
          }}
        >
          <TitleService service={service} />
        </Typography>
        <Typography variant="h6" sx={{ color: 'border.main' }}>
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
          justifyContent="center"
          alignItems="flex-end"
          sx={{ position: 'relative' }}
        >
          <LottieAnimacao
            style={{ height: 180 }}
            animationData={
              mode === 'light' ? LottieLightModeWorker : LottieDarkModeWorker
            }
          />
          <LottieAnimacao
            style={{
              height: 60,
              position: 'absolute',
              right: -10,
              bottom: 30,
            }}
            animationData={FerramentaLight}
          />
        </Stack>
      </Stack>
      {/* <LottieAnimacao animationData={T2} /> */}
    </Stack>
  );
}
