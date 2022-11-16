import { styled, Link, Typography } from '@mui/material';

export const StyledLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
`;
export const TypographyLink = styled(Typography)`
  color: ${({ theme }) => theme.palette.secondary.main};
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
`;
