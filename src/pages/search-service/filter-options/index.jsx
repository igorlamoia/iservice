import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Chip,
  CircularProgress,
  Divider,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useInteractivityContext } from '../../../hooks/context/interactivityContext';
import { MyButton, MyInput } from '../../../components';
import { TimePicker } from '@mui/x-date-pickers';
import { ToogleWeekGroup } from '../../worker-register/week-toogle';
import { filterValidationSchema } from '../../../utils/validation/worker-filter.schema';

export function FilterOptions() {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  const initialValues = {
    horarioAtendimentoInicio: null,
    horarioAtendimentoFim: null,
    diasAtendimento: [],
  };

  const { setInteractivityError, setInteractivitySuccess } =
    useInteractivityContext();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFilterForm = async (values) => {
    try {
      setIsLoading(true);
      console.log('values', values);
      setInteractivitySuccess('E-mail de recuperação enviado com sucesso');
      setOpen(false);
    } catch (err) {
      setInteractivityError(err.message);
      // setErr(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Chip label="Filtros" sx={{ maxWidth: 150 }} onClick={handleClickOpen} />
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              bgcolor: 'background.default',
              boxShadow: 8,
              borderRadius: 2,
              py: 2,
            },
          }}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={filterValidationSchema}
            onSubmit={async (values) => {
              console.log('valuesaq', values);
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
                    fontSize: '1.7rem',
                    textAlign: 'center',
                    width: '70%',
                    margin: 'auto',
                  }}
                >
                  Encontre seu profissional no lugar certo!
                </DialogTitle>
                <DialogContent>
                  <Divider
                    sx={{
                      width: '70%',
                      margin: 'auto',
                    }}
                  />
                  <Stack spacing={3} sx={{ mt: 2, p: 5 }}>
                    <Stack spacing={1}>
                      <Typography>Selecione sua cidade</Typography>
                      <Stack spacing={1}>
                        {/* TODO autocomplete cidades */}
                        {Boolean(errors.cidadesAtendimento) && (
                          <FormHelperText error>
                            {errors.cidadesAtendimento}
                          </FormHelperText>
                        )}
                      </Stack>
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
                      <Typography>Horários de atuação</Typography>
                      <Stack direction="row" spacing={3}>
                        <div>
                          <TimePicker
                            label="Início do atendimento"
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
                        </div>
                        <div>
                          <TimePicker
                            label="Fim do atendimento"
                            type="time"
                            value={values.horarioAtendimentoFim}
                            onChange={(value) =>
                              setFieldValue(
                                'horarioAtendimentoFim',
                                value,
                                true
                              )
                            }
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </div>
                      </Stack>
                    </Stack>
                  </Stack>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center' }}>
                  {/* <Button onClick={handleClose}>Cancelar</Button> */}
                  <MyButton
                    type="submit"
                    sx={{ maxWidth: 200, borderRadius: 4 }}
                    isLoading={isLoading}
                  >
                    Buscar
                  </MyButton>
                </DialogActions>
              </form>
            )}
          </Formik>
        </Dialog>
      </div>
    </>
  );
}
