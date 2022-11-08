/* eslint-disable react/jsx-props-no-spreading */
import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import { useInteractivityContext } from './hooks/context/interactivityContext';

export default function App() {
  const {
    interactivityError,
    setInteractivityError,
    interactivitySuccess,
    setInteractivitySuccess,
  } = useInteractivityContext();
  return (
    <>
      <Snackbar
        open={interactivityError}
        autoHideDuration={6000}
        onClose={() => setInteractivityError('')}
      >
        <Alert
          onClose={() => setInteractivityError('')}
          severity="error"
          sx={{ width: '100%' }}
        >
          {interactivityError}
        </Alert>
      </Snackbar>
      <Snackbar
        open={interactivitySuccess}
        autoHideDuration={6000}
        onClose={() => setInteractivitySuccess('')}
      >
        <Alert
          onClose={() => setInteractivitySuccess('')}
          severity="success"
          sx={{ width: '100%' }}
        >
          {interactivitySuccess}
        </Alert>
      </Snackbar>
    </>
  );
}
