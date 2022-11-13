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
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Stack>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ textTransform: 'uppercase' }}
        >
          <TitleService service={service} />
        </Typography>
        <Typography variant="h6" sx={{ color: 'border.main' }}>
          Veja abaixo algumas as opções que melhor te atende
        </Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="flex-end"
        sx={{ maxWidth: { xs: 0, md: 300 }, position: 'relative' }}
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
      {/* <LottieAnimacao animationData={T2} /> */}
    </Stack>
  );
}
