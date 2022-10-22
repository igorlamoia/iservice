import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { LogoTipo } from '..';
import { FirstStep } from './first-step';
import { SecondStep } from './second-step';
import { LoginRegisterNavbar } from '../navbar';
import { useAuthContext } from '../../../hooks/context/AuthContext';

// const firebaseData = {
//   displayName: 'John Doe',
//   email: '',
//   photoURL: '',
// };

export default function Register() {
  const [actualStep, setActualStep] = useState(0);
  const { currentUser } = useAuthContext();
  const steps = ['Dados básicos', 'Dados de uso'];

  const handleNextStep = useCallback(
    () => setActualStep((prevStep) => prevStep + 1),
    []
  );

  console.log('renderizando');

  return (
    <>
      {/* <DrawerAppBar /> */}
      <LoginRegisterNavbar />
      <Container
        sx={{
          minHeight: '100vh',
          py: 4,
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <Paper sx={{ p: 4, minWidth: { xs: '90vw', sm: 375 } }} elevation={4}>
          <Stack>
            <Stack
              spacing={1}
              sx={{
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <LogoTipo />
              <Typography>Olá, seja bem vindo!</Typography>
              <Typography>
                {currentUser
                  ? 'Finalize seu cadastro'
                  : 'Cadastre-se por 2 etapas'}
              </Typography>
            </Stack>
            <Stepper sx={{ mt: 2 }} activeStep={actualStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {actualStep === 0 && <FirstStep handleNextStep={handleNextStep} />}
            {actualStep === 1 && <SecondStep />}

            <Typography sx={{ textAlign: 'center', mt: 2, fontSize: '0.8rem' }}>
              Já possui conta? <Link to="/login">Login</Link>
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </>
  );
}
