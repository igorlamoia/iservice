import React from 'react';
import { useRouteError } from 'react-router-dom';

export function ErrorBoundary() {
  const error = useRouteError();
  console.log('erro:', error.message);
  // console.error('console', error);
  return <div>Deu ruim!</div>;
}
