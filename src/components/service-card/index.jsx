import React from "react";
import "./style.scss";
import Diarista from "../../assets/images/diarista.png";

export default function ServiceCard() {
  return (
    <div className="service-card">
      <strong>Diarista</strong>
      <img src={Diarista} alt="diarista limpando" />
      <button>Ver Preços</button>
    </div>
  );
}
