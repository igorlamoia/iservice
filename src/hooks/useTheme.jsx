import { Box, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { createContext, useMemo, useState, useContext } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getTheme } from '../global/theme';

const ColorModeContext = createContext({});

export function ColorModeProvider({ children }) {
  const isLightMode = useMediaQuery('(prefers-color-scheme: light)');

  const [mode, setMode] = useState(
    localStorage.getItem('@iservice:mode') === 'light'
      ? true
      : localStorage.getItem('@iservice:mode') === 'dark'
      ? false
      : isLightMode
  );

  const valuesTheme = useMemo(
    () => ({
      toggleColorMode: () => {
        localStorage.setItem('@iservice:mode', mode ? 'dark' : 'light');
        setMode((prevMode) => !prevMode);
      },
      mode,
    }),
    [mode]
  );

  const theme = useMemo(() => createTheme(getTheme(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={valuesTheme}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {mode ? (
          <Box
            sx={{
              background:
                'linear-gradient(to right bottom, #f3fcf4, #f3fdf9, #f5fdfd, #f8feff, #fcfeff, #fcfeff, #fcfeff, #fcfeff, #f8feff, #f5fdfd, #f3fdf9, #f3fcf4)',
            }}
          >
            {children}
          </Box>
        ) : (
          children
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export const useMyTheme = () => useContext(ColorModeContext);
