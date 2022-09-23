import React from 'react';
import './style.scss';
import LottieAnimacao from 'lottie-react';
import iServiceLottie from '../../assets/iservice-lottie.json';
import { ServiceCard, WorkerCard, SearchInput, Footer } from '../../components';
import TopMenu from '../../components/top-menu';
import { Categorias } from './categorias';

export default function Home() {
  return (
    <>
      <TopMenu />
      <main>
        <div className="caixainicial">
          <div className="textoinicial">
            <h1>
              Algum problema doméstico para resolver? <span>i</span>Service vai
              até você
            </h1>
            <p>Conectando quem precisa com quem sabe fazer</p>
            <SearchInput />
          </div>
          <LottieAnimacao animationData={iServiceLottie} className="lottie" />
        </div>
        <div className="categorias-div">
          <Categorias />
        </div>
        <WorkerCard />
        <ServiceCard />
        {/* <lottie-interactive path={LottieAnimacao} interaction="hover" /> */}
      </main>
      <Footer />
    </>
  );
}
