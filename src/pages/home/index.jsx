import React from "react";
import "./style.scss";
import LottieAnimacao from "lottie-react";
import iServiceLottie from "../../assets/iservice-lottie.json";
import AssistenciaSVG from "../../assets/assistencia-tecnica.svg";
import ReparosSVG from "../../assets/reparos.svg";
import HouseSVG from "../../assets/house.svg";
import { ServiceCard, WorkerCard, SearchInput, Footer } from "../../components";

export default function Home() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", placeItems: "center" }}
    >
      <div style={{ marginTop: 15 }} />
      <SearchInput />
      <div style={{ marginTop: 15 }} />
      <WorkerCard />
      <div style={{ marginTop: 15 }} />
      <ServiceCard />
      <div style={{ marginTop: 15 }} />
      {/* <lottie-interactive path={LottieAnimacao} interaction="hover" /> */}
      {/* <LottieAnimacao animationData={iServiceLottie} /> */}
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
      <div style={{ marginTop: 15 }} />

      <Footer />
    </div>
  );
}
