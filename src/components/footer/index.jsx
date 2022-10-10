import React from 'react';
import './style.scss';
import { Box, Button, useTheme } from '@mui/material';

import TwitterSVG from '../../assets/twitter-icon';
import InstagramSVG from '../../assets/instagram-icon';
import FacebookSVG from '../../assets/facebook-icon';

export default function Footer() {
  const {
    palette: { mode },
  } = useTheme();
  return (
    <Box
      component="footer"
      sx={{ backgroundColor: 'shape.main' }}
      className="footer"
    >
      <h3>
        <span>i</span>Service
      </h3>
      <div className="main">
        <ul>
          <li>
            <Button type="button">Quem somos</Button>
          </li>
          <li>
            <Button type="button">Trabalhe conosco</Button>
          </li>
          <li>
            <Button type="button">Assistência</Button>
          </li>
        </ul>
        <p className="about">
          Ache os melhores serviços dos mais variados tipos em nossa plataforma.
          Ou use suas habilidades e conhecimentos para fazer algum dinheiro.
        </p>
        <ul>
          <li>
            <Button type="button">Termos de uso</Button>
          </li>
          <li>
            <Button type="button">Política de privacidade</Button>
          </li>
          <li>
            <Button type="button">Enviar feedback</Button>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <ul className="social">
          <li>
            <Button type="button">
              <TwitterSVG light={mode === 'light'} />
            </Button>
          </li>
          <li>
            <Button type="button">
              <InstagramSVG light={mode === 'light'} />
            </Button>
          </li>
          <li>
            <Button type="button">
              <FacebookSVG light={mode === 'light'} />
            </Button>
          </li>
        </ul>
        <p>© iService</p>
      </div>
    </Box>
  );
}
