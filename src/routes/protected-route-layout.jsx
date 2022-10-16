import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/context/AuthContext';

export function ProtectedRouteLayout({ children }) {
  const { currentUser } = useAuthContext();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
}
