import React from 'react';
import { styled } from '@mui/material';
import { Categorias } from '../../../components';

const CategoriasDiv = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 2rem;
  max-width: 1000px;
  margin: auto auto;
`;

export function NoParamsFilterRoute({ service = {} }) {
  if (!service.codEspecialidade && !service.codCategoria) {
    return (
      <CategoriasDiv>
        <Categorias />
      </CategoriasDiv>
    );
  }
  return null;
}
