/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';

import {
  Stack,
  useTheme,
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';

import { ToggleTheme } from '../../components';
import { ScrolltopIcon } from '../../components/app-bar/scroll-top/scroll-to-top-icon';
import iServiceLogo from '../../assets/LogoiService.svg';

const navItems = ['Oferecer serviço', 'Quem somos', 'Contato'];

export function LoginRegisterNavbar() {
  const { palette } = useTheme();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const navigate = useNavigate();
  return (
    <Box>
      <Toolbar id="back-to-top-anchor" />
      <AppBar
        component="nav"
        color="transparent"
        sx={{ backdropFilter: 'blur(20px)', position: 'absolute' }}
        elevation={0}
      >
        <Toolbar>
          <ToggleTheme />
          <Button
            variant="contained"
            sx={{
              borderRadius: '1rem',
              ml: 'auto',
              boxShadow: `1px 2px 10px 2px ${
                palette.mode === 'light'
                  ? palette.primary.light
                  : palette.primary.main
              }`,
              transition: 'transform .2s ease-in-out',
              '&:hover': {
                backgroundColor: palette.primary.main,
                boxShadow: `1px 2px 10px 2px ${
                  palette.mode === 'light'
                    ? palette.primary.light
                    : palette.primary.main
                }`,
                transform: 'scale(0.95)',
              },
            }}
            onClick={() => {
              navigate('/', {
                state: { name: 'delicia', idade: 23 },
              });
            }}
            disableElevation
          >
            Página Inicial
          </Button>
        </Toolbar>
      </AppBar>
      <ScrolltopIcon />
    </Box>
  );
}

function LogoTipo() {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        display: { xs: 'none', sm: 'flex' },
        alignItems: 'center',
      }}
    >
      <img
        style={{
          width: '1.7rem',
          height: '1.7rem',
          marginRight: '0.5rem',
        }}
        src={iServiceLogo}
        alt="Logo iService"
      />
      <Typography variant="h6" component="div">
        <Typography variant="span" color="secondary">
          i
        </Typography>
        Service
      </Typography>
    </Stack>
  );
}
