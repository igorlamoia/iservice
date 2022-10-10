import {
  Button,
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
    <div className="card">
      <p>Todas as categorias de serviços</p>
      <Stack
        className="category-list"
        direction="row"
        padding={3}
        sx={{ gap: { xs: 2, sm: 5, md: '6rem' } }}
        justifyContent="center"
      >
        <Button>
          <Stack sx={{ gap: 2 }} alignItems="center">
            <AssistenciaSVG
              w={celular && 50}
              h={celular && 48}
              light={themeMode}
            />
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
          <Stack sx={{ gap: 2 }} alignItems="center">
            <ReparosSVG w={celular && 50} h={celular && 48} light={themeMode} />
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
          <Stack sx={{ gap: 2 }} alignItems="center">
            <HouseSVG w={celular && 50} h={celular && 48} light={themeMode} />
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
    </div>
  );
}
