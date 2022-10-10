import * as React from 'react';

import { Home } from './pages';
import { ColorModeProvider } from './hooks/useTheme';
import { Box } from '@mui/material';

export default function ToggleColorMode() {
  return (
    <ColorModeProvider>
      <Home />
    </ColorModeProvider>
  );
}
