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
