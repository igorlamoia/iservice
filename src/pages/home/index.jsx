import React from 'react';
import './style.scss';
import LottieAnimacao from 'lottie-react';
import { Stack } from '@mui/material';
import iServiceLottie from '../../assets/iservice-lottie.json';
import { ServiceCard, WorkerCard, Footer } from '../../components';
import { Categorias } from './categorias';
import ResponsiveAppBar from '../../components/app-bar';

export default function Home() {
  return (
    <>
      <ResponsiveAppBar />
      <main>
        <div className="caixainicial">
          <div className="textoinicial">
            <h1>
              Algum problema doméstico para resolver? <span>i</span>Service vai
              até você
            </h1>
            <p>Conectando quem precisa com quem sabe fazer</p>
            {/* <SearchInput /> */}
          </div>
          <LottieAnimacao animationData={iServiceLottie} className="lottie" />
        </div>
        <div className="categorias-div">
          <Categorias />
        </div>
        <Stack
          direction="row"
          spacing={8}
          justifyContent="center"
          sx={{
            py: 2,
            overflowX: 'scroll',
          }}
        >
          <WorkerCard />
          <WorkerCard />
          <WorkerCard />
        </Stack>
        <Stack
          direction="row"
          spacing={8}
          justifyContent="space-around"
          sx={{ my: 10, overflowX: 'scroll' }}
        >
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
        </Stack>
        {/* <lottie-interactive path={LottieAnimacao} interaction="hover" /> */}
      </main>
      <Footer />
    </>
  );
}
