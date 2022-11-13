import { Container, Typography, Stack, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';
import LottieAnimacao from 'lottie-react';
import { Footer, Navbar } from '../../components';
import { BreadCrumbsMenu } from './bread-crumbs-menu';
import LottieLightModeWorker from '../../assets/lightModeWorker.json';
import LottieDarkModeWorker from '../../assets/darkModeWorker.json';
import FerramentaLight from '../../assets/ferramentaLight.json';
// import T2 from '../../assets/t2.json';
// import useGeoLocation from '../../hooks/useGeolocation';

export default function SearchService() {
  const { state } = useLocation();
  const { palette } = useTheme();

  const { mode } = palette;
  console.log(mode);

  const service = state || {};

  return (
    <>
      <Container sx={{ minHeight: '100vh', pt: 2 }}>
        <Navbar />
        <BreadCrumbsMenu params={service} />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{ textTransform: 'uppercase' }}
            >
              PRECISANDO DE {''}
              {service?.nomeEspecialidade
                ? service.nomeEspecialidade
                : service.nomeCategoria}
              ?
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
      </Container>
      <Footer />
    </>
  );
}
