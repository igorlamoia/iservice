import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CircularProgress, Typography } from '@mui/material';
import { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useInteractivityContext } from '../../hooks/context/interactivityContext';
import { MyInput } from '../../components';
import { auth } from '../../firebase';

export function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  const { setInteractivityError, setInteractivitySuccess } =
    useInteractivityContext();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const forgotPasswordSchema = yup.object({
    email: yup
      .string('E-mail inválido')
      .email('E-mail inválido')
      .required('E-mail é obrigatório'),
  });

  const handleLoginForm = async (values) => {
    try {
      setIsLoading(true);
      await sendPasswordResetEmail(auth, values.email);
      setInteractivitySuccess('E-mail de recuperação enviado com sucesso');
      setOpen(false);
    } catch (err) {
      if (err.code === 'auth/wrong-password') {
        return setInteractivityError('Senha incorreta');
      }
      if (err.code === 'auth/user-not-found') {
        return setInteractivityError(
          'Seu E-mail cadastrado não é esse, tente lembrar qual foi usado'
        );
      }
      if (err.code === 'auth/invalid-email') {
        return setInteractivityError(
          'E-mail inválido, confira o e-mail digitado'
        );
      }
      setInteractivityError(err.message);
      // setErr(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Typography
        sx={{
          fontWeight: 400,
          fontSize: '0.9rem',
          textAlign: 'end',
          cursor: 'pointer',
          color: 'primary.main',
        }}
        onClick={handleClickOpen}
      >
        Esquei minha senha
      </Typography>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: { bgcolor: 'background.default', boxShadow: 8 },
          }}
        >
          <Formik
            initialValues={{ email: '' }}
            validationSchema={forgotPasswordSchema}
            onSubmit={async (values) => {
              handleLoginForm(values);
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
                <DialogTitle>Recuperação de Senha</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Fique tranquilo(a), vamos te ajudar a recuperar sua senha.
                    Apenas informe o endereço de e-mail cadastrado abaixo e
                    clique em recuperar!
                  </DialogContentText>
                  <MyInput
                    label="E-mail"
                    id="email"
                    type="email"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(errors.email && touched.email)}
                    errorMessage={errors.email}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancelar</Button>
                  {isLoading ? (
                    <>
                      <Button disabled>Recuperando...</Button>
                      <CircularProgress size={14} />
                    </>
                  ) : (
                    <Button
                      type="submit"
                      //  onClick={handleClose}
                    >
                      Recuperar
                    </Button>
                  )}
                </DialogActions>
              </form>
            )}
          </Formik>
        </Dialog>
      </div>
    </>
  );
}
