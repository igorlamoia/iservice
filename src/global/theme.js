export const getTheme = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main: '#ffff',
          },
        }
      : {
          primary: {
            main: '#0000ff',
          },
        }),
  },
  typography: {
    fontFamily: '"Quicksand", "Helvetica", "Arial", sans-serif',
  },
});
