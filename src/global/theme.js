import { ptBR } from '@mui/material/locale';

const darkColorElevation1 = 'rgba(155,155,155,0.2)';
const darkColorElevation2 = 'rgba(155,155,155,0.14)';
const darkColorElevation3 = 'rgba(155,155,155,0.12)';

export const getTheme = (mode) => ({
  palette: {
    mode: mode ? 'light' : 'dark',
    ...(mode
      ? {
          // common: { black: '#000', white: '#fff' },
          background: { paper: 'rgba(255,255,255, 0.6)', default: '#fafafa' },
          shape: {
            main: '#d9d9d9',
            select: '#B3FFBD',
            selectLight: '#F3FCF4',
          },
          border: {
            main: '#C3C4C4',
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
            main: 'black',
            light: '#303030',
            select: 'rgba(0, 200, 126, 1)',
          },
          border: {
            main: '#505051',
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
    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: mode ? '#C3C4C4' : '#505051',
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        root: {
          '.Mui-disabled': {
            color: mode ? '#C3C4C4' : '#505051',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // background: bgColor,
          borderRadius: '0.5rem',
          '&.MuiInputBase-multiline': {
            padding: 1,
          },
        },
        input: {
          fontWeight: 500,
          // background: bgColor,
          padding: '15.5px 14px',
          borderRadius: '0.5rem',
          '&.MuiInputBase-inputSizeSmall': {
            padding: '10px 14px',
            '&.MuiInputBase-inputAdornedStart': {
              paddingLeft: 0,
            },
          },
        },
        inputAdornedStart: {
          paddingLeft: 4,
        },
        notchedOutline: {
          borderRadius: '0.5rem',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.MuiListItemButton-gutters': {
            // backgroundColor: 'blue',
            borderRadius: '0.5rem',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          '&.MuiButton-text': {
            color: mode ? 'black' : 'white',
          },
          borderRadius: '0.5rem',
          '&.MuiButton-textPrimary': {
            transition: 'background-color .3s ease',
            ':hover': {
              // backgroundColor: '#b9f6ca',
            },
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
  ...(!mode && {
    shadows: [
      'none',
      `0px 2px 1px -1px ${darkColorElevation1},0px 1px 1px 0px ${darkColorElevation2},0px 1px 3px 0px ${darkColorElevation3}`,
      `0px 3px 1px -2px ${darkColorElevation1},0px 2px 2px 0px ${darkColorElevation2},0px 1px 5px 0px ${darkColorElevation3}`,
      `0px 3px 3px -2px ${darkColorElevation1},0px 3px 4px 0px ${darkColorElevation2},0px 1px 8px 0px ${darkColorElevation3}`,
      `0px 2px 4px -1px ${darkColorElevation1},0px 4px 5px 0px ${darkColorElevation2},0px 1px 10px 0px ${darkColorElevation3}`,
      `0px 3px 5px -1px ${darkColorElevation1},0px 5px 8px 0px ${darkColorElevation2},0px 1px 14px 0px ${darkColorElevation3}`,
      `0px 3px 5px -1px ${darkColorElevation1},0px 6px 10px 0px ${darkColorElevation2},0px 1px 18px 0px ${darkColorElevation3}`,
      `0px 4px 5px -2px ${darkColorElevation1},0px 7px 10px 1px ${darkColorElevation2},0px 2px 16px 1px ${darkColorElevation3}`,
      `0px 5px 5px -3px ${darkColorElevation1},0px 8px 10px 1px ${darkColorElevation2},0px 3px 14px 2px ${darkColorElevation3}`,
      `0px 5px 6px -3px ${darkColorElevation1},0px 9px 12px 1px ${darkColorElevation2},0px 3px 16px 2px ${darkColorElevation3}`,
      `0px 6px 6px -3px ${darkColorElevation1},0px 10px 14px 1px ${darkColorElevation2},0px 4px 18px 3px ${darkColorElevation3}`,
      `0px 6px 7px -4px ${darkColorElevation1},0px 11px 15px 1px ${darkColorElevation2},0px 4px 20px 3px ${darkColorElevation3}`,
      `0px 7px 8px -4px ${darkColorElevation1},0px 12px 17px 2px ${darkColorElevation2},0px 5px 22px 4px ${darkColorElevation3}`,
      `0px 7px 8px -4px ${darkColorElevation1},0px 13px 19px 2px ${darkColorElevation2},0px 5px 24px 4px ${darkColorElevation3}`,
      `0px 7px 9px -4px ${darkColorElevation1},0px 14px 21px 2px ${darkColorElevation2},0px 5px 26px 4px ${darkColorElevation3}`,
      `0px 8px 9px -5px ${darkColorElevation1},0px 15px 22px 2px ${darkColorElevation2},0px 6px 28px 5px ${darkColorElevation3}`,
      `0px 8px 10px -5px ${darkColorElevation1},0px 16px 24px 2px ${darkColorElevation2},0px 6px 30px 5px ${darkColorElevation3}`,
      `0px 8px 11px -5px ${darkColorElevation1},0px 17px 26px 2px ${darkColorElevation2},0px 6px 32px 5px ${darkColorElevation3}`,
      `0px 9px 11px -5px ${darkColorElevation1},0px 18px 28px 2px ${darkColorElevation2},0px 7px 34px 6px ${darkColorElevation3}`,
      `0px 9px 12px -6px ${darkColorElevation1},0px 19px 29px 2px ${darkColorElevation2},0px 7px 36px 6px ${darkColorElevation3}`,
      `0px 10px 13px -6px ${darkColorElevation1},0px 20px 31px 3px ${darkColorElevation2},0px 8px 38px 7px ${darkColorElevation3}`,
      `0px 10px 13px -6px ${darkColorElevation1},0px 21px 33px 3px ${darkColorElevation2},0px 8px 40px 7px ${darkColorElevation3}`,
      `0px 10px 14px -6px ${darkColorElevation1},0px 22px 35px 3px ${darkColorElevation2},0px 8px 42px 7px ${darkColorElevation3}`,
      `0px 11px 14px -7px ${darkColorElevation1},0px 23px 36px 3px ${darkColorElevation2},0px 9px 44px 8px ${darkColorElevation3}`,
      `0px 11px 15px -7px ${darkColorElevation1},0px 24px 38px 3px ${darkColorElevation2},0px 9px 46px 8px ${darkColorElevation3}`,
    ],
  }),
  ptBR,
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
