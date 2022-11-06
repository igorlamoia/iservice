import * as Lottie from 'lottie-interactive';
import {
  Container,
  Paper,
  Typography,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';

export default function AboutUs() {
  const { breakpoints } = useTheme();
  const celular = useMediaQuery(breakpoints.down('md'));

  const tamanho = celular ? 80 : 150;

  return (
    <Container>
      <Paper
        elevation={3}
        sx={{
          py: 2,
          width: '100%',
          px: { xs: 1, md: 4, lg: 8 },
          mt: 2,
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
        <Typography textAlign="center" sx={{ mx: 3 }}>
          iService é uma plataforma de serviços domésticos. Conectamos
          profissionais da sua região com pessoas solicitando serviço, trazendo
          mais facilidade, simplicidade e rapidez para seu dia a dia.
        </Typography>
        <Stack
          direction={{ xs: 'row' }}
          sx={{
            flexWrap: 'wrap',
            justifyContent: 'center',
            mt: 4,
            alignItems: 'center',
            gap: { xs: 3, sm: 8, md: 8 },
          }}
        >
          <MyStackWrapper>
            <lottie-interactive
              path="Escolha.json"
              interaction="hover"
              style={{ height: tamanho, width: tamanho }}
            />
            <MyTypographyLottie>Escolha o melhor</MyTypographyLottie>
          </MyStackWrapper>

          <MyStackWrapper>
            <lottie-interactive
              path="chat.json"
              interaction="hover"
              style={{ height: tamanho, width: tamanho }}
            />
            <MyTypographyLottie>Entre em contato</MyTypographyLottie>
          </MyStackWrapper>

          <MyStackWrapper>
            <lottie-interactive
              path="check.json"
              interaction="hover"
              style={{ height: tamanho, width: tamanho }}
            />
            <MyTypographyLottie>Conclua o Serviço</MyTypographyLottie>
          </MyStackWrapper>
        </Stack>
      </Paper>
    </Container>
  );
}

function MyStackWrapper({ children }) {
  return (
    <Stack
      sx={{
        mt: 2,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </Stack>
  );
}

function MyTypographyLottie({ children }) {
  return (
    <Typography
      sx={{
        textAlign: 'center',
        fontSize: {
          xs: '0.9rem',
          sm: '1rem',
        },
        mt: { xs: '0.5rem', md: '1rem' },
        fontWeight: '600',
      }}
    >
      {children}
    </Typography>
  );
}
