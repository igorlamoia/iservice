export const getTheme = (mode) => ({
  palette: {
    mode: mode ? 'light' : 'dark',
    ...(mode
      ? {
          // common: { black: '#000', white: '#fff' },
          background: { paper: 'rgba(255,255,255, 0.6)', default: '#fafafa' },
          shape: {
            main: '#d9d9d9',
          },
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
          shadow: {
            main: '#d9d9d9',
            input: 'rgba(0, 0, 0, 0.1)',
          },
        }
      : {
          // background-image: linear-gradient(to right top, #141e1e, #162827, #183230, #1a3d38, #1d4840);
          // common: { black: '#000', white: '#fff' },
          background: { paper: 'rgba(0, 0, 0, 0.5)', default: 'rgb(9,9,10)' },
          shape: {
            main: 'rgb(9,9,10)',
            light: '#202020',
          },
          shadow: {
            main: 'rgba(5, 5, 5, 0.9)',
            input: 'rgba(255, 255, 255, 0.1)',
          },
          primary: {
            light: 'rgba(43, 230, 106, 1)',
            main: 'rgba(0, 200, 126, 1)',
            dark: 'rgba(43, 230, 106, 1)',
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

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          '&.MuiButton-text': {
            color: mode ? 'black' : 'white',
          },
          // '&.MuiButton-contained': {
          //   color: 'yellow',
          // },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: mode
          ? {
              scrollbarColor: '#2b2b2b #2b2b2b',
              '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                backgroundColor: '#fff',
              },
              '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                // borderRadius: 8,
                backgroundImage: 'linear-gradient(180deg, #95f3b4, #fafafa)',
                border: '1px solid #d9d9d9',
              },
              '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover':
                {
                  backgroundImage: 'linear-gradient(180deg, #2be66a, #fafafa)',
                },
            }
          : {
              scrollbarColor: '#2b2b2b #2b2b2b',
              '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                backgroundColor: '#18181b',
              },
              '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                // borderRadius: 8,
                backgroundImage: 'linear-gradient(180deg, #00c87e, #18181b)',
                border: '1px solid #2b2b2b',
              },
              '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover':
                {
                  backgroundImage: 'linear-gradient(180deg, #2be66a, #18181b)',
                },
            },
      },
    },
  },
});

// rgb(17 24 39)
// background-color: rgb(24 24 27);
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
