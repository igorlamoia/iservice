import { useState } from 'react';
import {
  Container,
  FormHelperText,
  Paper,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useNavigate } from 'react-router-dom';
import { MyButton, Navbar, WorkerCard } from '../../components';
import LocationInputs from './location-search';
import { ToogleWeekGroup } from './week-toogle';
import { convertTimeStringToMinute, formatarHora } from '../../utils/format';
import Profession from './profession';
import { useAuthContext } from '../../hooks/context/AuthContext';
import { api } from '../../utils/api';
import { workerValidationSchema } from '../../utils/validation/worker-register.schema';
import { useInteractivityContext } from '../../hooks/context/interactivityContext';

export default function WorkerRegister() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setLogedUser, logedUser } = useAuthContext();
  const { setInteractivityError, setInteractivitySuccess } =
    useInteractivityContext();
  const [validationErros, setValidationErros] = useState({});
  const [profissionValues, setProfissionValues] = useState({
    codCategoria: '',
    profissao: '',
    especialidades: [],
  });
  const [hourDe, setHourDe] = useState(null);
  const [hourAte, setHourAte] = useState(null);
  const [location, setLocation] = useState({
    state: 0,
    cities: [],
  });

  const [descricao, setDescricao] = useState(null);
  const [days, setDays] = useState([]);

  const handleChangeDe = (newValue) => {
    setHourDe(newValue);
  };
  const handleChangeAte = (newValue) => {
    setHourAte(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setValidationErros([]);
      const payload = {
        descricaoProfissional: descricao,
        horarioAtendimentoInicio: convertTimeStringToMinute(
          formatarHora(hourDe)
        ),
        horarioAtendimentoFim: convertTimeStringToMinute(formatarHora(hourAte)),
        codUsuario: logedUser.codUsuario,
        especialidades: profissionValues.especialidades?.map(
          (especialidade) => ({
            nome: profissionValues.profissao,
            descricao: especialidade,
            codCategoria: profissionValues.codCategoria,
          })
        ),
        cidadesAtendimento: location.cities?.map((city) => ({
          codEstado: location.state,
          nomeCidade: city,
        })),
        diasAtendimento: days.join(),
      };
      await workerValidationSchema.validate(payload, {
        abortEarly: false,
      });
      const { data } = await api.post('cadastrar/prestador', payload);
      setIsLoading(false);
      setInteractivitySuccess(data.mensagem);
      setLogedUser({ ...logedUser, prestador: true });
      navigate('/');
    } catch (error) {
      setIsLoading(false);
      if (error.response?.data?.mensagem)
        return setInteractivityError(error.response?.data?.mensagem);

      let errors = {};
      if (Array.isArray(error.inner)) {
        if (error.inner[0]?.name === 'ValidationError') {
          // console.log('Erro de validação');
          Object.keys(error.inner).forEach((erro) => {
            errors = {
              ...errors,
              [error.inner[erro].path]: error.inner[erro].message,
            };
          });
          setValidationErros(errors);
          setInteractivityError(
            'Dados inválidos, por favor confira os dados acima marcados como inválidos'
          );
        }
      } else {
        if (error.mensagem) {
          return setInteractivityError(error.mensagem);
        }
        // console.log('Outro erro');
        else {
          return setInteractivityError('Falha no servidor');
        }
      }
    }
  };

  return (
    <>
      <Navbar />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',

          pb: 2,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{ textAlign: 'center', mt: 2 }}
        >
          Consiga mais clientes sendo nosso parceiro!
        </Typography>
        <Stack
          direction={{ sm: 'column', md: 'row' }}
          sx={{
            mt: { xs: 2, md: 0 },
            justifyContent: 'center',
            alignItems: 'center',
          }}
          spacing={5}
        >
          <Paper sx={{ p: 2, maxWidth: 375, borderRadius: 3 }} elevation={3}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={3} sx={{ mt: 2 }}>
                <Stack spacing={1}>
                  <Typography>Selecione os locais atuação</Typography>
                  {Boolean(validationErros.cidadesAtendimento) && (
                    <FormHelperText error>
                      {validationErros.cidadesAtendimento}
                    </FormHelperText>
                  )}
                  <Stack spacing={1}>
                    <LocationInputs
                      setLocation={setLocation}
                      location={location}
                      validationErros={validationErros}
                    />
                  </Stack>
                </Stack>
                <Stack spacing={1}>
                  <Typography>Dias da semana que irá atender</Typography>
                  <div>
                    <ToogleWeekGroup mudarDias={setDays} dias={days} />
                    {Boolean(validationErros?.diasAtendimento) && (
                      <FormHelperText error>
                        {validationErros.diasAtendimento}
                      </FormHelperText>
                    )}
                  </div>
                </Stack>
                <Stack spacing={1}>
                  <Typography>Horários de atuação</Typography>
                  <Stack direction="row" spacing={3}>
                    <div>
                      <TimePicker
                        label="De"
                        type="time"
                        value={hourDe}
                        onChange={handleChangeDe}
                        renderInput={(params) => <TextField {...params} />}
                      />
                      {Boolean(validationErros?.horarioAtendimentoInicio) && (
                        <FormHelperText error>
                          {validationErros.horarioAtendimentoInicio}
                        </FormHelperText>
                      )}
                    </div>
                    <div>
                      <TimePicker
                        label="Até"
                        type="time"
                        value={hourAte}
                        onChange={handleChangeAte}
                        renderInput={(params) => <TextField {...params} />}
                      />

                      {Boolean(validationErros?.horarioAtendimentoFim) && (
                        <FormHelperText error>
                          {validationErros.horarioAtendimentoFim}
                        </FormHelperText>
                      )}
                    </div>
                  </Stack>
                </Stack>

                <Profession
                  setProfissionValues={setProfissionValues}
                  validationErros={validationErros}
                />
                <Stack spacing={1}>
                  <Typography>Descrição profissional</Typography>
                  <div>
                    <TextareaAutosize
                      aria-label="minimum height"
                      onChange={(e) => setDescricao(e.target.value)}
                      minRows={2}
                      placeholder="Descreva suas habilidades e experiências"
                      style={{
                        fontFamily: 'Quicksand',
                        borderRadius: '0.5rem',
                        backgroundColor: 'transparent',
                        minWidth: '100%',
                        maxWidth: '100%',
                        fontSize: '1rem',
                        padding: 10,
                      }}
                    />
                    {Boolean(validationErros?.descricaoProfissional) && (
                      <FormHelperText error>
                        {validationErros.descricaoProfissional}
                      </FormHelperText>
                    )}
                  </div>
                </Stack>
                <MyButton type="submit" isLoading={isLoading}>
                  Finalizar Cadastro
                </MyButton>
              </Stack>
            </form>
          </Paper>
          <Stack sx={{ mt: 2, maxWidth: 375 }}>
            <Typography
              variant="h5"
              component="h1"
              sx={{ textAlign: 'center', my: 1 }}
            >
              Seu cartão de visitas
            </Typography>
            <WorkerCard
              user={{
                nome: logedUser.nome,
                photoURL: logedUser?.linkFoto,
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
        </Stack>
      </Container>
    </>
  );
}
