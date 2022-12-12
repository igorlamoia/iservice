import {
  Dialog,
  Toolbar,
  useMediaQuery,
  useTheme,
  IconButton,
  Stack,
  DialogContent,
  Divider,
  DialogTitle,
  TextareaAutosize,
  FormHelperText,
  Typography,
} from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Formik, isNaN } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/context/AuthContext';
import { api } from '../../utils/api';
import { MyButton, WorkerCard } from '../../components';
import { useInteractivityContext } from '../../hooks/context/interactivityContext';

export function Solicitacao({ user, open, setOpen }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { logedUser } = useAuthContext();
  const { setInteractivityError, setInteractivitySuccess } =
    useInteractivityContext();
  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  // const Transition = React.forwardRef(function Transition(props, ref) {
  //   return <Slide direction="up" ref={ref} {...props} />;
  // });

  const handleNovaSolicitacao = async ({ descricao }) => {
    try {
      if (!logedUser.codUsuario) {
        navigate('/login');
        return setInteractivityError(
          'Você precisa estar logado para solicitar um serviço'
        );
      }

      const { data } = await api.post('cadastrar/solicitacao', {
        codUsuario: logedUser.codUsuario,
        codPrestador: user.codPrestador,
        descricao,
      });
      setInteractivitySuccess(data.mensagem);
      handleClose();
    } catch (error) {
      return setInteractivityError(
        error.response?.data?.mensagem || 'Falha na api'
      );
    }
  };

  const initialValues = {
    descricao: '',
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      // TransitionComponent={Transition}
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
          handleNovaSolicitacao(values);
        }}
      >
        {({
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
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
              Faça sua solicitação
            </DialogTitle>
            <DialogContent>
              <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
                <Typography sx={{ mb: 2 }}>
                  Detalhe sua necessidade para {user.nome}:
                </Typography>

                <TextareaAutosize
                  aria-label="minimum height"
                  value={values.descricao}
                  onChange={handleChange}
                  name="descricao"
                  onBlur={handleBlur}
                  minRows={5}
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
                {Boolean(errors?.descricao) && touched.descricao && (
                  <FormHelperText error>{errors.descricao}</FormHelperText>
                )}
                <MyButton
                  type="submit"
                  sx={{ maxWidth: 200, borderRadius: 4, color: 'white', mt: 2 }}
                  isLoading={false}
                >
                  Solicitar
                </MyButton>
              </Stack>
            </DialogContent>
          </form>
        )}
      </Formik>
    </Dialog>
  );
}
