import React from 'react';
import './style.scss';
import {
  Box,
  Container,
  IconButton,
  List,
  ListItemButton,
  Paper,
  Stack,
  Typography,
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
    <Paper
      component="footer"
      // sx={{ backgroundColor: 'shape.main' }}
      className="footer"
      elevation={2}
    >
      <Container>
        <h3>
          <span>i</span>Service
        </h3>
        <Stack
          component="nav"
          direction={{ xs: 'column', sm: 'row' }}
          sx={{
            // px: { xs: 2, sm: 3 },
            justifyContent: { xs: 'center', sm: 'space-between' },
            alignItems: { xs: 'center', sm: 'flex-start' },
            textAlign: 'center',
          }}
        >
          <List
            sx={{
              alignItems: { xs: 'center', sm: 'flex-start' },
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <li>
              <ListItemButton type="button">Quem somos</ListItemButton>
            </li>
            <li>
              <ListItemButton type="button">Trabalhe conosco</ListItemButton>
            </li>
            <li>
              <ListItemButton type="button">Assistência</ListItemButton>
            </li>
          </List>
          <Typography
            sx={{
              maxWidth: 400,
              display: { xs: 'none', sm: 'block' },
            }}
          >
            Ache os melhores serviços dos mais variados tipos em nossa
            plataforma. Ou use suas habilidades e conhecimentos para fazer algum
            dinheiro.
          </Typography>
          <List
            sx={{
              alignItems: { xs: 'center', sm: 'flex-end' },
              display: 'flex',
              flexDirection: 'column',
            }}
          >
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
          </List>
        </Stack>
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
      </Container>
    </Paper>
  );
}
