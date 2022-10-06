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
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Fab } from '@mui/material';
import ToggleTheme from '../toggle-theme';
import { HideOnScroll } from './hide-on-scroll';
import { ScrollTop } from './scroll-to-top';

const drawerWidth = 240;
const navItems = ['Oferecer serviço', 'Quem somos', 'Contato', 'Entrar'];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
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
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
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
    <Box sx={{ display: 'flex', bgColor: '#ffff' }}>
      <Toolbar id="back-to-top-anchor" />
      <HideOnScroll {...props}>
        <AppBar
          component="nav"
          // color="primary"
          color="transparent"
          sx={{ backdropFilter: 'blur(20px)' }}
          // enableColorOnDark
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
            <img
              style={{
                width: '1.5rem',
                height: '1.5rem',
                marginRight: '0.5rem',
              }}
              src="/LogoiService.svg"
              alt="Logo iService"
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              <Typography variant="span" color="secondary">
                i
              </Typography>
              Service
            </Typography>
            <ToggleTheme />
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item) => (
                <Button key={item} sx={{ color: 'buttonText' }}>
                  {item}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </Box>
  );
}

export default DrawerAppBar;
