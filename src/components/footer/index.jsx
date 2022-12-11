import React from 'react';
import './style.scss';
import {
  Container,
  IconButton,
  List,
  ListItemButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';

import TwitterSVG from '../../assets/social/twitter-icon';
import InstagramSVG from '../../assets/social/instagram-icon';
import FacebookSVG from '../../assets/social/facebook-icon';

export default function Footer() {
  const {
    palette: { mode },
  } = useTheme();

  const themeMode = mode === 'light';

  return (
    <Paper
      component="footer"
      sx={{ bgcolor: 'rgba(0,0,0,0)' }}
      className="footer"
      elevation={3}
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
              paddingLeft: 4,
            }}
          >
            Encontre os serviços que precisa para o seu problema de forma rápida
            e simples!
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
