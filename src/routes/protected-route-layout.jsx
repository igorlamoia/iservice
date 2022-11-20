import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/context/AuthContext';

export function ProtectedRoute({ children }) {
  const { logedUser } = useAuthContext();

  if (!logedUser?.nome) {
    return <Navigate to="/login" />;
  }

  return children;
}
