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
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            mt: 2,
            fontSize: {
              xs: '1.4rem',
              sm: '1.8rem',
            },
          }}
        >
          O que é o <span style={{ color: 'var(--color-secondary)' }}>i</span>
          Serice
        </Typography>
        <Stack direction={'row'}></Stack>
        <lottie-interactive
          path="Escolha.json"
          interaction="hover"
        ></lottie-interactive>
      </Paper>
    </Container>
  );
}
