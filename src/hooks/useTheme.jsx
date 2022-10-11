import { Box, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { createContext, useMemo, useState, useContext } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getTheme } from '../global/theme';

const ColorModeContext = createContext({});

export function ColorModeProvider({ children }) {
  const [mode, setMode] = useState(
    useMediaQuery('(prefers-color-scheme: light)')
  );
  const valuesTheme = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => !prevMode);
      },
      mode,
    }),
    []
  );

  const theme = useMemo(() => createTheme(getTheme(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={valuesTheme}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {/* <Box
          sx={{
            background: mode
              ? 'linear-gradient(to right bottom, #f3fcf4, #f3fdf9, #f5fdfd, #f8feff, #fcfeff, #fcfeff, #fcfeff, #fcfeff, #f8feff, #f5fdfd, #f3fdf9, #f3fcf4)'
              : 'linear-gradient(to right bottom, #141e1e, #111e20, #0e1d22, #0c1c24, #0d1b26, #0d1b26, #0d1b26, #0d1b26, #0c1c24, #0e1d22, #111e20, #141e1e)',
          }}
        > */}
        {children}
        {/* </Box> */}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export const useMyTheme = () => useContext(ColorModeContext);
