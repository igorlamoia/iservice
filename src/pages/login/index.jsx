import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Formik } from 'formik';
import { auth } from '../../firebase';
import GoogleSVG from '../../assets/social/social-google.svg';
import SocialSVG from '../../assets/social/social-facebook.svg';
import DrawerAppBar from '../../components/app-bar';
import { MyButton, MyInput } from '../../components';

export default function Login() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    console.log(values);
    return;
    e.preventDefault();
    // console.log(e.target[0].value);
    // console.log(e.target);
    const email = 'iguim@a.com';
    const password = '123456';
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/chat');
    } catch (err) {
      setErr(true);
    }
  };

  console.log('rodando');

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
            initialValues={{
              email: '',
              email2: '',
              senha: '',
              submit: null,
            }}
            // validationSchema={Yup.object().shape({
            //   email: Yup.string()
            //     .email('Must be a valid email')
            //     .max(255)
            //     .required('Email is required'),
            //   password: Yup.string().max(255).required('Password is required'),
            // })}
            onSubmit={async (
              values,
              { setErrors, setStatus, setSubmitting }
            ) => {
              console.log('Submitou');
              console.log(values);
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <MyInput
                    label="E-mail"
                    id="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                  <MyInput
                    label="Senha"
                    id="senha"
                    type={false ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          //  onClick={handleClickShowPassword}
                          //  onMouseDown={handleMouseDownPassword}
                        >
                          {true ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    value={values.senha}
                    onChange={handleChange}
                  />
                  <MyButton type="submit">Entrar</MyButton>
                  {err && <span>Something went wrong</span>}
                </Stack>
              </form>
            )}
          </Formik>
          <Typography sx={{ mt: 2 }}>
            Ainda não tem sua conta? <Link to="/login/register">Register</Link>
          </Typography>
        </Paper>
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
