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
import { MyPaper } from '../../../components';

export function Categorias() {
  const {
    breakpoints,
    palette: { mode },
  } = useTheme();
  const themeMode = mode === 'light';
  const celular = useMediaQuery(breakpoints.down('sm'));

  return (
    <MyPaper
      elevation={4}
      sx={{
        py: 2,
        width: '100%',
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
    </MyPaper>
  );
}
