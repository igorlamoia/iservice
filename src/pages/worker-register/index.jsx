import { useState } from 'react';
import { Container, Paper, TextareaAutosize } from '@mui/material';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { ptBR } from 'date-fns/locale';
import { Navbar, WorkerCard } from '../../components';
import LocationInputs from './location-search';
import { ToogleWeekGroup } from './week-toogle';
import { formatarHora } from '../../utils/format';

export default function WorkerRegister() {
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
              <LocationInputs setLocation={setLocation} location={location} />
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={ptBR}
              >
                <MobileDatePicker
                  label="Data de nascimento"
                  inputFormat="dd/MM/yyyy"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
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
                <ToogleWeekGroup mudarDias={setDays} dias={days} />
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
              </LocalizationProvider>
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
            }}
          />
        </Stack>
      </Container>
    </>
  );
}
