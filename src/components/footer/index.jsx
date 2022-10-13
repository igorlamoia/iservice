import React from 'react';
import './style.scss';
import {
  Box,
  Button,
  IconButton,
  ListItemButton,
  useTheme,
} from '@mui/material';

import TwitterSVG from '../../assets/twitter-icon';
import InstagramSVG from '../../assets/instagram-icon';
import FacebookSVG from '../../assets/facebook-icon';

export default function Footer() {
  const {
    palette: { mode },
  } = useTheme();

  const themeMode = mode === 'light';

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
            <ListItemButton type="button">Quem somos</ListItemButton>
          </li>
          <li>
            <ListItemButton type="button">Trabalhe conosco</ListItemButton>
          </li>
          <li>
            <ListItemButton type="button">Assistência</ListItemButton>
          </li>
        </ul>
        <p className="about">
          Ache os melhores serviços dos mais variados tipos em nossa plataforma.
          Ou use suas habilidades e conhecimentos para fazer algum dinheiro.
        </p>
        <ul>
          <li>
            <ListItemButton type="button">Termos de uso</ListItemButton>
          </li>
          <li>
            <ListItemButton type="button">
              Política de privacidade
            </ListItemButton>
          </li>
          <li>
            <ListItemButton type="button">Enviar feedback</ListItemButton>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <ul className="social">
          <li>
            <IconButton type="button">
              <TwitterSVG light={themeMode} />
            </IconButton>
          </li>
          <li>
            <IconButton type="button">
              <InstagramSVG light={themeMode} />
            </IconButton>
          </li>
          <li>
            <IconButton type="button">
              <FacebookSVG light={themeMode} />
            </IconButton>
          </li>
        </ul>
        <p>© iService</p>
      </div>
    </Box>
  );
}
