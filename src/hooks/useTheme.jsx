import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { createContext, useMemo, useState, useContext } from 'react';
import { getTheme } from '../global/theme';

const ColorModeContext = createContext({});

export function ColorModeProvider({ children }) {
  const [mode, setMode] = useState('light');

  const valuesTheme = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme(getTheme(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={valuesTheme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export const useMyTheme = () => useContext(ColorModeContext);
