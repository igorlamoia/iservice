/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Stack, useTheme } from '@mui/material';
import ToggleTheme from '../toggle-theme';
import { HideOnScroll } from './hide-on-scroll';
import { ScrolltopIcon } from './scroll-top/scroll-to-top-icon';

const drawerWidth = 240;
const navItems = ['Oferecer serviço', 'Quem somos', 'Contato'];

function DrawerAppBar(props) {
  const tema = useTheme();
  console.log(tema);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        // bgcolor: 'primary.light',
        flex: 1,
        // backdropFilter: 'blur(20px)',
        textAlign: 'center',
      }}
      // color="transparent"
    >
      <Typography
        variant="h6"
        component="div"
        sx={{
          my: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          style={{ width: '1.5rem', height: '1.5rem', marginRight: '0.5rem' }}
          src="/LogoiService.svg"
          alt="Logo iService"
        />
        <Typography variant="span" color="secondary">
          i
        </Typography>
        Service
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center', color: 'primary.main' }}>
              <ListItemText sx={{ color: 'buttonText' }} primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  // eslint-disable-next-line react/no-unstable-nested-components

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
                  src="/LogoiService.svg"
                  alt="Logo iService"
                />
                <Typography variant="h6" component="div">
                  <Typography variant="span" color="secondary">
                    i
                  </Typography>
                  Service
                </Typography>
              </Stack>
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
            <div style={{ width: 202, display: 'flex' }}>
              <Button
                variant="contained"
                sx={{
                  borderRadius: '1rem',
                  ml: 'auto',
                  boxShadow: 2,
                  '&:hover': {
                    boxShadow: 2,
                    filter: `drop-shadow(0 0 0.4rem ${tema.palette.primary.main})`,
                    transition: 'filter 0.25s',
                  },
                }}
                disableElevation
              >
                Entrar
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          color="primary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            backdropFilter: 'blur(5px)',
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <ScrolltopIcon />
    </Box>
  );
}

export default DrawerAppBar;
