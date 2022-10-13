/* eslint-disable react/jsx-props-no-spreading */
import { Paper } from '@mui/material';
import React from 'react';

export default function MyPaper({ children, sx = {}, ...rest }) {
  return <Paper {...rest}>{children}</Paper>;
}
