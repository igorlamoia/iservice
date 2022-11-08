import React from 'react';
import { useLocation } from 'react-router-dom';

export default function SearchService() {
  const {
    state: { service },
  } = useLocation();

  return <div>Buscar serviço {service.descricao}</div>;
}
