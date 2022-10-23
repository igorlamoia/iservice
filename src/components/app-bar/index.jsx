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

import ToggleTheme from '../toggle-theme';
import { HideOnScroll } from './hide-on-scroll';
import { ScrolltopIcon } from './scroll-top/scroll-to-top-icon';
import { LeftDrawer } from './drawer';
import iServiceLogo from '../../assets/LogoiService.svg';
import { useAuthContext } from '../../hooks/context/AuthContext';
import { api } from '../../utils/api';

const navItems = ['Oferecer serviço', 'Quem somos', 'Contato'];

function DrawerAppBar(props) {
  const { palette } = useTheme();
  const [isLoading, setIsLoading] = React.useState(false);
  const [userLoged, setUserLoged] = React.useState(null);

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { currentUser, logOut } = useAuthContext();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleUserInformation = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get(
        `listar/requisitante?idFirebase=${currentUser.uid}`
      );
      setUserLoged(data.payload);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (currentUser?.uid) {
      handleUserInformation();
    }
  }, [currentUser]);

  // eslint-disable-next-line react/no-unstable-nested-components
  const navigate = useNavigate();
  return (
    <Box>
      <Toolbar id="back-to-top-anchor" />
      <HideOnScroll {...props}>
        <AppBar
          component="nav"
          color="transparent"
          sx={{ backdropFilter: 'blur(20px)' }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Stack direction="row" sx={{ width: 202 }}>
              <LogoTipo />
              <ToggleTheme />
            </Stack>
            <Box
              sx={{
                display: { xs: 'none', sm: 'flex' },
                ml: 'auto',
                mr: 'auto',
                gap: { xs: 'none', sm: 1, md: 2 },
              }}
            >
              {navItems.map((item) => (
                <Button
                  sx={{ '&:hover': { bgcolor: 'transparent' } }}
                  key={item}
                >
                  <Typography color="buttonText">{item}</Typography>
                </Button>
              ))}
            </Box>
            <div style={{ width: 202, display: 'flex', gap: 2 }}>
              {!userLoged && (
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
                    navigate('/login', {
                      state: { name: 'delicia', idade: 23 },
                    });
                  }}
                  disableElevation
                >
                  Entrar
                </Button>
              )}
              {userLoged && (
                <>
                  {currentUser && (
                    <Stack alignItems="center">
                      <img
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          objectFit: 'cover',
                        }}
                        src={currentUser?.photoURL}
                        alt=""
                      />
                      <Typography sx={{ fontSize: 12 }}>
                        {userLoged?.nome}
                      </Typography>
                    </Stack>
                  )}
                  <Button
                    sx={{ '&:hover': { bgcolor: 'transparent' } }}
                    onClick={() => {
                      logOut();
                      setUserLoged(null);
                    }}
                  >
                    Sair
                  </Button>
                </>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <LeftDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        {...props}
        navItems={navItems}
      />
      <ScrolltopIcon />
    </Box>
  );
}

export default DrawerAppBar;

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
