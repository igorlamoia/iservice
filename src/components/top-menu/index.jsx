// import React from "react";
import './style.scss';

// import Diarista from "../../assets/images/diarista.png";

export default function TopMenu() {
  return (
    <nav className="">
      <ul>
        <li>
          <a href="" className="primeiro">
            <img src="/LogoiService.svg" alt="Logo iService" />
            <span>i</span>
            Service
          </a>
        </li>
        <div className="segundo">
          <li>
            <a href="">Oferecer serviço</a>
          </li>
          <li>
            <a href=""> Quem somos</a>
          </li>
          <li>
            <a href="">Contato</a>
          </li>
        </div>
        <div className="terceiro">
          <li>
            <a href="">Entrar</a>
          </li>
          <li>
            <button>Cadastrar</button>
          </li>
        </div>
      </ul>
    </nav>
  );
}
