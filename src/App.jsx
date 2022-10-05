import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Home } from './pages';
import { ColorModeProvider, useMyTheme } from './hooks/useTheme';

function MyApp() {
  // const colorMode = React.useContext(ColorModeContext);
  const contexto = useMyTheme();
  // console.log(contexto);
  return (
    <Box sx={{ mt: 10 }}>
      <IconButton
        sx={{ ml: 1 }}
        onClick={contexto.toggleColorMode}
        color="inherit"
      >
        <Typography variant="h3">Clareisa</Typography>
      </IconButton>
    </Box>
  );
}

export default function ToggleColorMode() {
  return (
    <ColorModeProvider>
      <Home />
      <MyApp />
      <Typography variant="h3">Clareisa</Typography>
    </ColorModeProvider>
  );
}
