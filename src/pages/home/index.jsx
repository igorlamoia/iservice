import React from 'react';
import './style.scss';
import LottieAnimacao from 'lottie-react';
import { Container, Typography } from '@mui/material';
import iServiceLottie from '../../assets/iservice-lottie.json';
import { ServiceCard, WorkerCard, Footer } from '../../components';
import { Categorias } from './categorias';
import ResponsiveAppBar from '../../components/app-bar';
import { Carousel } from './carousel';

export default function Home() {
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
                  lg: '3.5rem',
                  md: '2.4rem',
                  sm: '2rem',
                  xs: '1.5rem',
                },
                mt: { xs: '3rem', md: '2rem', lg: 0 },
                fontWeight: '600',
              }}
            >
              Algum problema doméstico para resolver? <span>i</span>Service vai
              até você
            </Typography>
            <p>Conectando quem precisa com quem sabe fazer</p>
          </div>
          <LottieAnimacao animationData={iServiceLottie} className="lottie" />
        </Container>
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
