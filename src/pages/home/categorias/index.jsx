import {
  Button,
  Container,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import './style.scss';
import AssistenciaSVG from '../../../assets/assistencia-tecnica';
import ReparosSVG from '../../../assets/reparos';
import HouseSVG from '../../../assets/house';

export function Categorias() {
  const {
    breakpoints,
    palette: { mode },
  } = useTheme();
  const themeMode = mode === 'light';
  const celular = useMediaQuery(breakpoints.down('sm'));

  return (
    <Paper
      // elevation={3}
      sx={{
        py: 2,
        width: '100%',
        boxShadow:
          '0px 2px 4px -1px rgb(150 150 150 / 20%), 0px 4px 5px 0px rgb(150 150 150 / 14%), 0px 1px 10px 0px rgb(150 150 150 / 12%)',
        ...(themeMode && {
          boxShadow:
            '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
        }),
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{
          mt: 2,
          fontSize: {
            xs: '1.4rem',
            sm: '2rem',
          },
        }}
      >
        Todas as categorias de serviços
      </Typography>
      <Stack
        direction="row"
        padding={3}
        sx={{
          gap: { xs: 2, sm: 5, md: '6rem' },
          flexWrap: 'wrap',
        }}
        justifyContent="center"
      >
        <Button>
          <Stack
            sx={{ gap: 2, py: 1 }}
            alignItems="center"
            justifyContent="center"
          >
            <AssistenciaSVG size={celular ? 50 : 70} light={themeMode} />
            <Typography
              sx={{
                fontSize: {
                  xs: '0.7rem',
                  sm: '1rem',
                },
              }}
            >
              Assistência Técnica
            </Typography>
          </Stack>
        </Button>

        <Button>
          <Stack sx={{ gap: 2 }} alignItems="center" justifyContent="center">
            {}
            <ReparosSVG size={celular ? 50 : 70} light={themeMode} />
            <Typography
              sx={{
                fontSize: {
                  xs: '0.7rem',
                  sm: '1rem',
                },
              }}
            >
              Reformas e reparos
            </Typography>
          </Stack>
        </Button>

        <Button>
          <Stack
            sx={{
              gap: 2,
              justifyContent: 'space-around',
              // alignItems: 'center',
            }}
            alignItems="center"
            // justifyContent="center"
          >
            <HouseSVG size={celular ? 50 : 70} light={themeMode} />
            <Typography
              sx={{
                fontSize: {
                  xs: '0.7rem',
                  sm: '1rem',
                },
              }}
            >
              Serviços domésticos
            </Typography>
          </Stack>
        </Button>
      </Stack>
    </Paper>
  );
}
