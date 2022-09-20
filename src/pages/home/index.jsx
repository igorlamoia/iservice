import React from "react";
import "./style.scss";
import LottieAnimacao from "lottie-react";
import iServiceLottie from "../../assets/iservice-lottie.json";
import AssistenciaSVG from "../../assets/assistencia-tecnica.svg";
import ReparosSVG from "../../assets/reparos.svg";
import HouseSVG from "../../assets/house.svg";
import { ServiceCard, WorkerCard, SearchInput, Footer } from "../../components";
import TopMenu from "../../components/top-menu";

export default function Home() {
  return (
    <div className="container">
      <TopMenu />
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
      <WorkerCard />
      <ServiceCard />
      {/* <lottie-interactive path={LottieAnimacao} interaction="hover" /> */}
      <div className="card">
        <p>Todas as categorias de serviços</p>
        <ul className="category-list">
          <li>
            <a href="#">
              <img src={AssistenciaSVG} alt="" />
              <strong>Assistência Técnica</strong>
            </a>
          </li>

          <li>
            <a href="#">
              <img src={ReparosSVG} alt="" />
              <strong>Reformas e reparos</strong>
            </a>
          </li>

          <li>
            <a href="#">
              <img src={HouseSVG} alt="" />
              <strong>Serviços domésticos</strong>
            </a>
          </li>
        </ul>
      </div>

      <Footer />
    </div>
  );
}
