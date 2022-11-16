import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Chip,
  Divider,
  FormHelperText,
  Stack,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { Formik, isNaN } from 'formik';
import { TimePicker } from '@mui/x-date-pickers';
import { useNavigate } from 'react-router-dom';
import Slide from '@mui/material/Slide';
import { useInteractivityContext } from '../../../hooks/context/interactivityContext';
import { MyButton, SearchInputForm } from '../../../components';
import { ToogleWeekGroup } from '../../worker-register/week-toogle';
import { api } from '../../../utils/api';
import { FiltersSelected } from './filters-selected';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function FilterOptions({ service }) {
  const navigate = useNavigate();
  const { setInteractivityError, setInteractivitySuccess } =
    useInteractivityContext();

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  const [cities, setCities] = useState([]);
  const [isLoadingCities, setIsLoadingCities] = useState(false);

  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);

  const [profissions, setProfissions] = useState([]);
  const [isLoadingProfissions, setIsLoadingProfissions] = useState(false);

  const [especialities, setEspecialities] = useState([]);
  const [isLoadingEspecialities, setIsLoadingEspecialities] = useState(false);

  const initialValues = {
    horarioAtendimentoInicio: service.horarioAtendimentoInicio || null,
    horarioAtendimentoFim: service.horarioAtendimentoFim || null,
    diasAtendimento: service.diasAtendimento || [],
    city: service.city || null,
    category: service.category || null,
    profission: service.profission || null,
    especiality: service.especiality || null,
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFilterForm = async (values) => {
    try {
      setIsLoading(true);

      if (
        values.horarioAtendimentoInicio &&
        isNaN(values.horarioAtendimentoInicio)
      )
        throw Error('Horário de início inválido');
      if (values.horarioAtendimentoFim && isNaN(values.horarioAtendimentoFim))
        throw Error('Horário de Fim inválido');
      setOpen(false);
      navigate('/search/service', {
        state: {
          nomeCategoria: values.category?.nome,
          codCategoria: values.category?.codCategoria,
          nomeEspecialidade: values.profission?.nome,
          codEspecialidade: values.profission?.codEspecialidade,
          descricao: values.especiality?.nome,
          // O que usa na tela de filtro:
          city: values.city,
          category: values.category,
          profission: values.profission,
          especiality: values.especiality,
          horarioAtendimentoInicio: values.horarioAtendimentoInicio,
          horarioAtendimentoFim: values.horarioAtendimentoFim,
          diasAtendimento: values.diasAtendimento,
        },
      });
      console.log('values', values);
    } catch (err) {
      setInteractivityError(err.message);
      // setErr(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCidades = async () => {
    try {
      if (cities.length > 0) return;
      setIsLoadingCities(true);
      const { data } = await api.get('buscar-todas-cidades/prestadores'); //  "codCidade": "1", "nome": "Leopoldina", "fk_Estado_codEstado": "31"
      setCities(data.payload);
    } catch (error) {
      setInteractivityError(error.mensagem);
    } finally {
      setIsLoadingCities(false);
    }
  };

  const handleCategories = async () => {
    try {
      if (categories.length > 0) return;
      setIsLoadingCategories(true);
      const { data } = await api.get('listar/todas-categorias'); //  "codCategoria": "1",  "nome": "Assistência Técnica"
      setCategories(data.payload);
    } catch (error) {
      setInteractivityError(error.mensagem);
    } finally {
      setIsLoadingCategories(false);
    }
  };

  const handleProfissions = async () => {
    try {
      if (profissions.length > 0) return;
      setIsLoadingProfissions(true);
      const { data } = await api.get('listar/todas-profissoes'); //  "codEspecialidade": "1",  "nome": "desenvolvedora"
      setProfissions(data.payload);
    } catch (error) {
      setInteractivityError(error.mensagem);
    } finally {
      setIsLoadingProfissions(false);
    }
  };

  const handleEspecialities = async () => {
    try {
      if (especialities.length > 0) return;
      setIsLoadingEspecialities(true);
      const { data } = await api.get('listar/todas-especialidades'); //  "codEspecialidade": "1",  "nome": "desenvolvedora"
      setEspecialities(data.payload);
    } catch (error) {
      setInteractivityError(error.mensagem);
    } finally {
      setIsLoadingEspecialities(false);
    }
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <Stack spacing={1}>
        <Chip
          label="Filtros"
          sx={{ maxWidth: 150 }}
          onClick={handleClickOpen}
        />
        {/* TODO - Filtros escolhidos como chip's  */}
        <FiltersSelected filtros={initialValues} />
      </Stack>

      <div>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
          PaperProps={{
            sx: {
              bgcolor: 'background.default',
              boxShadow: 8,
              borderRadius: 2,
              py: 2,
            },
          }}
        >
          <Toolbar
            sx={{
              justifyContent: 'flex-end',
            }}
          >
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
          <Formik
            initialValues={initialValues}
            onSubmit={async (values) => {
              // console.log('valuesaq', values);
              handleFilterForm(values);
            }}
          >
            {({
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              touched,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <DialogTitle
                  sx={{
                    fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.5rem' },
                    textAlign: 'center',
                    width: '70%',
                    margin: 'auto',
                  }}
                >
                  Encontre o profissional que melhor atenda as suas
                  necessidades!
                </DialogTitle>
                <DialogContent>
                  <Divider
                    sx={{
                      width: '70%',
                      margin: 'auto',
                    }}
                  />
                  <Stack spacing={3} sx={{ mt: 2, p: 5 }}>
                    <Typography>
                      Escolha apenas o que achar necessário:
                    </Typography>
                    <Stack spacing={1}>
                      <Typography>Atuar na cidade</Typography>
                      <Stack spacing={1}>
                        <SearchInputForm
                          loading={isLoadingCities}
                          textFieldProps={{
                            label: 'Cidade',
                          }}
                          autocompleteProps={{
                            sx: { width: '100%' },
                            onFocus: handleCidades,
                            loading: isLoadingCities,
                            options: cities,
                            value: values.city,
                            onChange: (event, value) =>
                              setFieldValue('city', value),
                            isOptionEqualToValue: (option, value) =>
                              option?.nome === value?.nome,
                            getOptionLabel: (city) => `${city.nome}`,
                          }}
                        />
                        {Boolean(errors.city) && (
                          <FormHelperText error>{errors.city}</FormHelperText>
                        )}
                      </Stack>
                    </Stack>

                    <Stack spacing={1} direction={{ xs: 'column', md: 'row' }}>
                      <>
                        <SearchInputForm
                          loading={isLoadingCategories}
                          textFieldProps={{
                            label: 'Categoria',
                          }}
                          autocompleteProps={{
                            sx: { width: '100%' },
                            onFocus: handleCategories,
                            loading: isLoadingCategories,
                            options: categories,
                            value: values.category,
                            onChange: (event, value) =>
                              setFieldValue('category', value),
                            isOptionEqualToValue: (option, value) =>
                              option.nome === value.nome,
                            getOptionLabel: (category) => `${category.nome}`,
                          }}
                        />
                        {Boolean(errors.category) && (
                          <FormHelperText error>
                            {errors.category}
                          </FormHelperText>
                        )}
                      </>
                      <>
                        <SearchInputForm
                          loading={isLoadingProfissions}
                          textFieldProps={{
                            label: 'Profissão',
                          }}
                          autocompleteProps={{
                            sx: { width: '100%' },
                            onFocus: handleProfissions,
                            loading: isLoadingProfissions,
                            options: profissions,
                            value: values.profission,
                            onChange: (event, value) =>
                              setFieldValue('profission', value),
                            isOptionEqualToValue: (option, value) =>
                              option.nome === value.nome,
                            getOptionLabel: (profission) =>
                              `${profission.nome}`,
                          }}
                        />
                        {Boolean(errors.profission) && (
                          <FormHelperText error>
                            {errors.profission}
                          </FormHelperText>
                        )}
                      </>
                      <>
                        <SearchInputForm
                          loading={isLoadingEspecialities}
                          textFieldProps={{
                            label: 'Especialidade',
                          }}
                          autocompleteProps={{
                            sx: { width: '100%' },
                            onFocus: handleEspecialities,
                            loading: isLoadingEspecialities,
                            options: especialities,
                            value: values.especiality,
                            onChange: (event, value) =>
                              setFieldValue('especiality', value),
                            isOptionEqualToValue: (option, value) =>
                              option.nome === value.nome,
                            getOptionLabel: (especiality) =>
                              `${especiality.nome}`,
                          }}
                        />
                        {Boolean(errors.especiality) && (
                          <FormHelperText error>
                            {errors.especiality}
                          </FormHelperText>
                        )}
                      </>
                    </Stack>
                    <Stack spacing={1}>
                      <Typography>
                        Marque o(s) dia(s) que deseja ser atendido
                      </Typography>
                      <div>
                        <ToogleWeekGroup
                          mudarDias={(arrayDays) =>
                            setFieldValue('diasAtendimento', arrayDays, true)
                          }
                          dias={values.diasAtendimento}
                        />
                      </div>
                    </Stack>
                    <Stack spacing={1}>
                      <Typography>Horários de Atendimento</Typography>
                      <Stack direction="row" spacing={3}>
                        <TimePicker
                          label="Início"
                          type="time"
                          onChange={(value) =>
                            setFieldValue(
                              'horarioAtendimentoInicio',
                              value,
                              true
                            )
                          }
                          value={values.horarioAtendimentoInicio}
                          renderInput={(params) => <TextField {...params} />}
                        />
                        <TimePicker
                          label="Fim"
                          type="time"
                          value={values.horarioAtendimentoFim}
                          onChange={(value) =>
                            setFieldValue('horarioAtendimentoFim', value, true)
                          }
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Stack>
                    </Stack>
                  </Stack>
                  <Stack
                    sx={{ justifyContent: 'center', alignItems: 'center' }}
                  >
                    <MyButton
                      type="submit"
                      sx={{ maxWidth: 200, borderRadius: 4, color: 'white' }}
                      isLoading={isLoading}
                    >
                      Buscar
                    </MyButton>
                  </Stack>
                </DialogContent>
              </form>
            )}
          </Formik>
        </Dialog>
      </div>
    </>
  );
}
