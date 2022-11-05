import { useState } from 'react';
import { Container, Paper, TextareaAutosize, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Navbar, WorkerCard } from '../../components';
import LocationInputs from './location-search';
import { ToogleWeekGroup } from './week-toogle';
import { formatarHora } from '../../utils/format';
import Profession from './profession';

export default function WorkerRegister() {
  const [profissionValues, setProfissionValues] = useState({
    codCategoria: '',
    profissao: '',
    especialidades: [],
  });
  const [value, setValue] = useState(null);
  const [hourDe, setHourDe] = useState(null);
  const [hourAte, setHourAte] = useState(null);
  const [location, setLocation] = useState({
    state: 0,
    cities: [],
  });

  const [descricao, setDescricao] = useState(null);
  const [days, setDays] = useState([]);
  console.log('value kkk:', value);

  const handleChangeDe = (newValue) => {
    setHourDe(newValue);
  };
  const handleChangeAte = (newValue) => {
    setHourAte(newValue);
  };
  return (
    <>
      <Navbar />
      <Container
        sx={{
          display: 'flex',
          minHeight: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          pb: 2,
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{
            mt: { xs: 2, md: 0 },
            justifyContent: 'center',
            alignItems: 'center',
          }}
          spacing={5}
        >
          <Paper sx={{ p: 2, maxWidth: 375, borderRadius: 3 }} elevation={3}>
            <Stack spacing={3} sx={{ mt: 2 }}>
              <div>
                <Typography sx={{ mb: 1.5 }}>
                  Selecione os locais atuação
                </Typography>
                <Stack spacing={1}>
                  <LocationInputs
                    setLocation={setLocation}
                    location={location}
                  />
                </Stack>
              </div>

              <div>
                <Typography sx={{ mb: 1.5 }}>Horários de atuação</Typography>
                <Stack direction="row" spacing={3}>
                  <TimePicker
                    label="De"
                    value={hourDe}
                    onChange={handleChangeDe}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <TimePicker
                    label="Até"
                    value={hourAte}
                    onChange={handleChangeAte}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </div>
              <div>
                <Typography sx={{ mb: 1.5 }}>
                  Dias da semana que irá atender
                </Typography>
                <ToogleWeekGroup mudarDias={setDays} dias={days} />
              </div>
              <TextareaAutosize
                aria-label="minimum height"
                onChange={(e) => setDescricao(e.target.value)}
                minRows={3}
                placeholder="Descreva suas habilidades e experiências"
                style={{
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  maxWidth: 500,
                  padding: 10,
                }}
              />

              <Profession setProfissionValues={setProfissionValues} />
            </Stack>
          </Paper>

          <WorkerCard
            user={{
              nome: 'Igor',
              descricao,
              workDays: days,
              cidades: location?.cities,
              horaDe: formatarHora(hourDe),
              horaAte: formatarHora(hourAte),
              profissao: profissionValues.profissao,
              especialidades: profissionValues.especialidades,
            }}
          />
        </Stack>
      </Container>
    </>
  );
}
