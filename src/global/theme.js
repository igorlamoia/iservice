export const getTheme = (mode) => ({
  palette: {
    mode: mode ? 'light' : 'dark',
    ...(mode
      ? {
          // common: { black: '#000', white: '#fff' },
          // background: { paper: '#fff', default: '#fafafa' },
          primary: {
            light: 'rgba(149, 243, 180, 1)',
            main: 'rgba(43, 230, 106, 1)',
            dark: 'rgba(0, 200, 126, 1)',
            contrastText: '#fff',
          },
          secondary: {
            light: 'rgba(255, 158, 84, 1)',
            main: 'rgba(252, 151, 0, 1)',
            dark: 'rgba(206, 114, 0, 1)',
            contrastText: '#fff',
          },
          error: {
            light: '#e57373',
            main: '#f44336',
            dark: '#d32f2f',
            contrastText: '#fff',
          },
          text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.54)',
            disabled: 'rgba(0, 0, 0, 0.38)',
            hint: 'rgba(0, 0, 0, 0.38)',
          },
          // buttonText: 'rgba(0, 0, 0, 0.87)',
        }
      : {
          // background-image: linear-gradient(to right top, #141e1e, #162827, #183230, #1a3d38, #1d4840);
          // common: { black: '#000', white: '#fff' },
          background: { paper: 'rgb(0 30 30)', default: 'rgb(20 30 30)' },
          primary: {
            light: 'rgba(149, 243, 180, 1)',
            main: 'rgba(43, 230, 106, 1)',
            dark: 'rgba(0, 200, 126, 1)',
            contrastText: '#fff',
          },
          secondary: {
            light: 'rgba(255, 158, 84, 1)',
            main: 'rgba(252, 151, 0, 1)',
            dark: 'rgba(206, 114, 0, 1)',
            contrastText: '#fff',
          },
          error: {
            light: '#e57373',
            main: '#f44336',
            dark: '#d32f2f',
            contrastText: '#fff',
          },
          text: {
            primary: '#fff',
            secondary: '#fff',
            disabled: '#fff',
            hint: '#fff',
          },
        }),
  },
  typography: {
    fontFamily: '"Quicksand", "Helvetica", "Arial", sans-serif',
  },
});

// --color-primary: #2be66a;
//   --color-secondary: #fc9700;
//   --color-primary-medium: #95f3b4;
//   --color-primary-shape: #f3fcf4;
//   --color-primary-dark: #00c87e;
//   --color-text-button: #111111;
//   --color-text-comment: #474f60;
//   --color-shape: #ffff;
//   --color-bk-light: #fafafa;
//   --color-bk-dark: #d9d9d9;
