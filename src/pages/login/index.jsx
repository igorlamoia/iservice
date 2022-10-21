import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Formik } from 'formik';
import { auth } from '../../firebase';
import GoogleSVG from '../../assets/social/social-google.svg';
import SocialSVG from '../../assets/social/social-facebook.svg';
import DrawerAppBar from '../../components/app-bar';
import { MyButton, MyInput } from '../../components';
import { loginSchema } from '../../utils/validation/login.schema';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [errorForm, seterrorForm] = useState({ error: false });
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginForm = async (values) => {
    try {
      setIsLoading(true);

      await signInWithEmailAndPassword(auth, values.email, values.senha);
      navigate('/chat');
    } catch (err) {
      if (err.code === 'auth/wrong-password') {
        return seterrorForm({
          error: true,
          message: 'Senha incorreta',
        });
      }
      if (err.code === 'auth/user-not-found') {
        return seterrorForm({ error: true, message: 'Usuário não encontrado' });
      }
      seterrorForm({ error: true, message: err.message });
      // setErr(true);
    } finally {
      setIsLoading(false);
    }
  };

  const initialStateForm = {
    email: '',
    senha: '',
  };

  const handleClickShowPassword = () => {
    setShowPassword((old) => !old);
  };

  return (
    <>
      <DrawerAppBar />
      <Container
        sx={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <Paper sx={{ p: 4 }} elevation={4}>
          <Stack spacing={1} sx={{ alignItems: 'center', textAlign: 'center' }}>
            <LogoTipo />
            <Typography>Olá, bem vindo de volta</Typography>
            <Typography
              sx={({ palette }) => ({
                fontSize: '0.7rem',
                color: palette.primary.main,
                // textAlign: 'center',
              })}
            >
              Insira seus dados para entrar
            </Typography>
            <Stack direction="row" spacing={2}>
              <img src={GoogleSVG} alt="google" />
              <img src={SocialSVG} alt="google" />
            </Stack>
          </Stack>
          <OrTag />
          <Formik
            initialValues={initialStateForm}
            validationSchema={loginSchema}
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
                <Stack spacing={2}>
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
                  <MyInput
                    label="Senha"
                    onBlur={handleBlur}
                    id="senha"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                        >
                          {!showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    value={values.senha}
                    onChange={handleChange}
                    error={Boolean(errors.senha && touched.senha)}
                    errorMessage={errors.senha}
                  />
                  <MyButton
                    isLoading={isLoading}
                    disabled={isLoading}
                    type="submit"
                  >
                    Entrar
                  </MyButton>
                </Stack>
              </form>
            )}
          </Formik>
          <Typography sx={{ mt: 2 }}>
            Ainda não tem sua conta? <Link to="/login/register">Register</Link>
          </Typography>
        </Paper>
        <Snackbar
          open={errorForm.error}
          autoHideDuration={6000}
          onClose={() => seterrorForm(false)}
        >
          <Alert
            onClose={() => seterrorForm(false)}
            severity="error"
            sx={{ width: '100%' }}
          >
            {errorForm.message}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
}

function OrTag() {
  return (
    <Grid item xs={12}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />

        <Button
          variant="outlined"
          sx={({ palette }) => ({
            cursor: 'unset',
            m: 2,
            py: 0.5,
            px: 7,
            borderColor: `${palette.primary.main} !important`,
            color: `${palette.primary.main}!important`,
            fontWeight: 500,
            borderRadius: 3,
          })}
          disableRipple
          disabled
        >
          OU
        </Button>

        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
      </Box>
    </Grid>
  );
}

function LogoTipo() {
  return (
    <Stack
      direction="row"
      // spacing={2}
      sx={{
        display: { xs: 'none', sm: 'flex' },
        alignItems: 'center',
      }}
    >
      <img
        style={{
          width: '1.7rem',
          height: '1.7rem',
          marginRight: '0.5rem',
        }}
        src="LogoiService.svg"
        alt="Logo iService"
      />
      <Typography variant="h6" component="div">
        <Typography variant="span" color="secondary">
          i
        </Typography>
        Service
      </Typography>
    </Stack>
  );
}
