import React from 'react';
import './style.scss';
import LottieAnimacao from 'lottie-react';
import { Box, Container, Stack } from '@mui/material';
import iServiceLottie from '../../assets/iservice-lottie.json';
import { ServiceCard, WorkerCard, Footer } from '../../components';
import { Categorias } from './categorias';
import ResponsiveAppBar from '../../components/app-bar';

export default function Home() {
  return (
    <>
      <ResponsiveAppBar />
      <main>
        {/* <div className="caixainicial">
          <div className="textoinicial">
            <h1>
              Algum problema doméstico para resolver? <span>i</span>Service vai
              até você
            </h1>
            <p>Conectando quem precisa com quem sabe fazer</p>
          </div>
          <LottieAnimacao animationData={iServiceLottie} className="lottie" />
        </div> */}
        <div className="categorias-div">
          <Categorias />
        </div>
        <Container>
          <Stack
            direction="row"
            spacing={{ xs: 2, md: 4 }}
            // justifyContent="center"
            sx={{
              py: 2,
              overflowX: 'scroll',
              px: 4,
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              minWidth: '100%',
              '& > :first-child': {
                ml: 'auto',
              },
              '& > :last-child': {
                mr: 'auto',
              },
              scrollSnapType: 'x mandatory',
            }}
          >
            <WorkerCard />
            <WorkerCard />
            <WorkerCard />
            <WorkerCard />
            <WorkerCard />
            <WorkerCard />
            <WorkerCard />
            <WorkerCard />
          </Stack>
          <Stack
            direction="row"
            spacing={{ xs: 2, md: 4 }}
            // justifyContent="center"
            sx={{
              py: 4,
              overflowX: 'scroll',
              px: 4,
              gap: 4,
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              minWidth: '100%',
              '& > :first-child': {
                ml: 'auto',
              },
              '& > :last-child': {
                mr: 'auto',
              },
            }}
          >
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />
          </Stack>
        </Container>
        {/* <lottie-interactive path={LottieAnimacao} interaction="hover" /> */}
      </main>
      <Footer />
    </>
  );
}
