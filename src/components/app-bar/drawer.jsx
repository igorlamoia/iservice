import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import iServiceLogo from '../../assets/LogoiService.svg';

const drawerWidth = 240;

export function LeftDrawer({
  navItems,
  handleDrawerToggle,
  mobileOpen,
  logedUser = {},
  ...props
}) {
  const { window } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const navigate = useNavigate();
  return (
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
              style={{
                width: '1.5rem',
                height: '1.5rem',
                marginRight: '0.5rem',
              }}
              src={iServiceLogo}
              alt="Logo iService"
            />
            <Typography variant="span" color="secondary">
              i
            </Typography>
            Service
          </Typography>
          <Divider />
          <List>
            {navItems.map((item) => {
              if (logedUser?.prestador && item.hiddenPrestador) return null;
              return (
                <ListItem key={item.label} disablePadding>
                  <ListItemButton
                    onClick={() => navigate(`/${item.path}`)}
                    sx={{ textAlign: 'center', color: 'primary.main' }}
                  >
                    <ListItemText
                      sx={{ color: 'buttonText' }}
                      primary={item.label}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
