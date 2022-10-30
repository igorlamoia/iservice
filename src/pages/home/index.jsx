import React from 'react';
import './style.scss';
import LottieAnimacao from 'lottie-react';
import { Container, Typography, useTheme } from '@mui/material';
import iServiceLottie from '../../assets/iservice-lottie.json';
import darkIServiceLottie from '../../assets/dark-iservice-lottie.json';
import { ServiceCard, WorkerCard, Footer } from '../../components';
import { Categorias } from './categorias';
import ResponsiveAppBar from '../../components/app-bar';
import { Carousel } from './carousel';
import SearchInput from './search-input';

export default function Home() {
  const {
    palette: { mode },
  } = useTheme();
  const darkmode = mode === 'dark';

  return (
    <>
      <ResponsiveAppBar />
      <main>
        <Container className="caixainicial">
          <div className="textoinicial">
            <Typography
              variant="h1"
              sx={{
                fontSize: {
                  xs: '1.5rem',
                  sm: '1.7rem',
                  lg: '2.2rem',
                },
                mt: { xs: '3rem', md: '2rem', lg: 0 },
                fontWeight: '600',
              }}
            >
              Algum problema doméstico para resolver? <span>i</span>Service vai
              até você
            </Typography>
            <p>Conectando quem precisa com quem sabe fazer</p>
            <SearchInput />
          </div>
          <LottieAnimacao
            animationData={darkmode ? darkIServiceLottie : iServiceLottie}
            className="lottie"
          />
        </Container>
        {/* <AboutUs></AboutUs> */}
        <div className="categorias-div">
          <Categorias />
        </div>
        <Container>
          <Carousel>
            <WorkerCard />
            <WorkerCard />
            <WorkerCard />
            <WorkerCard />
            <WorkerCard />
            <WorkerCard />
            <WorkerCard />
            <WorkerCard />
          </Carousel>
          <Carousel>
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
          </Carousel>
        </Container>
        {/* <lottie-interactive path={LottieAnimacao} interaction="hover" /> */}
      </main>
      <Footer />
    </>
  );
}
