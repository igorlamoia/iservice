import React from "react";
import "./style.scss";

import TwitterSVG from "../../assets/twitter-icon.svg";
import InstagramSVG from "../../assets/instagram-icon.svg";
import FacebookSVG from "../../assets/facebook-icon.svg";

export default function Footer() {
  return (
    <footer className="footer">
      <h3>
        <span>i</span>Service
      </h3>
      <div className="main">
        <ul>
          <li>
            <a href="#">Quem somos</a>
          </li>
          <li>
            <a href="#">Trabalhe conosco</a>
          </li>
          <li>
            <a href="#">Assistência</a>
          </li>
        </ul>
        <p className="about">
          Ache os melhores serviços dos mais variados tipos em nossa plataforma.
          Ou use suas habilidades e conhecimentos para fazer algum dinheiro.
        </p>
        <ul>
          <li>
            <a href="#">Termos de uso</a>
          </li>
          <li>
            <a href="#">Política de privacidade</a>
          </li>
          <li>
            <a href="#">Enviar feedback</a>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <ul className="social">
          <li>
            <a href="#">
              <img src={TwitterSVG} alt="twitter logo" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src={InstagramSVG} alt="Instagram logo" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src={FacebookSVG} alt="Facebook logo" />
            </a>
          </li>
        </ul>
        <p>© iService</p>
      </div>
    </footer>
  );
}
