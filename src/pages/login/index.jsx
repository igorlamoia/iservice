import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Login() {
  const { state } = useLocation();
  return (
    <h1>
      Nome: {state.name}, Idade: {state.idade}
    </h1>
  );
}
