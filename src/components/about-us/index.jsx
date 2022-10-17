import {
  Container,
  Paper,
  Typography,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';
import { LottieInteractive } from 'lottie-interactive';

export default function AboutUs() {
  const {
    breakpoints,
    palette: { mode },
  } = useTheme();
  const themeMode = mode === 'light';
  const celular = useMediaQuery(breakpoints.down('sm'));
  return (
    <Container>
      <Paper
        elevation={3}
        sx={{
          py: 2,
          width: '100%',
          px: 8,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            my: 2,
            mb: 4,
            fontSize: {
              xs: '1.4rem',
              sm: '1.8rem',
            },
          }}
        >
          O que é o <span style={{ color: 'var(--color-secondary)' }}>i</span>
          Service
        </Typography>
        <Typography textAlign="center">
          iService é uma plataforma de serviços domésticos. Conectamos
          profissionais da sua região com pessoas solicitando serviço, trazendo
          mais facilidade, simplicidade e rapidez para seu dia a dia.
        </Typography>
        <Stack direction={'row'}></Stack>

        <lottie-interactive
          path="Escolha.json"
          interaction="hover"
          style={{ height: 250, width: 250 }}
        ></lottie-interactive>
        <Typography
          style={{ marginLeft: '1.8rem', marginBottom: '1.5rem' }}
          sx={{
            fontSize: {
              xs: '1rem',
              sm: '1.3rem',
              lg: '1.5rem',
            },
            mt: { xs: '3rem', md: '2rem', lg: 0 },
            fontWeight: '600',
          }}
        >
          Escolha o melhor
        </Typography>
      </Paper>
    </Container>
  );
}
