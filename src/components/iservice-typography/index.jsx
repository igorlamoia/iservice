import React from 'react';
import { styled, Typography } from '@mui/material';

const StyledTypography = styled(Typography)`
  font-weight: ${({ weight }) => weight};
  font-size: ${({ size }) => size};
`;

const ITypography = styled('span')`
  color: ${({ theme }) => theme.palette.secondary.main};
`;

export default function IserviceTypography({ size = '1rem', weight = 500 }) {
  return (
    <StyledTypography size={size} weight={weight}>
      <ITypography>i</ITypography>Service
    </StyledTypography>
  );
}
