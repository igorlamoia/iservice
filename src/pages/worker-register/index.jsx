import { useState } from 'react';
import { Box, Container, TextareaAutosize } from '@mui/material';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { ptBR } from 'date-fns/locale';
import { Navbar } from '../../components';
import LocationInputs from './location-search';
import { ToogleWeekGroup } from './week-toogle';

export default function WorkerRegister() {
  const [value, setValue] = useState(null);
  const [hourDe, setHourDe] = useState(null);
  const [hourAte, setHourAte] = useState(null);

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
      <Container>
        <Box>
          <LocationInputs />
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={ptBR}
          >
            <Stack spacing={3} sx={{ mt: 2 }}>
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
              <ToogleWeekGroup />
              <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                placeholder="Descreva suas habilidades e experiências"
                style={{
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  maxWidth: 500,
                  padding: 10,
                }}
              />
            </Stack>
          </LocalizationProvider>
        </Box>
      </Container>
    </>
  );
}
