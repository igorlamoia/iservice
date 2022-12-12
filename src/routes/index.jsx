import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  Home,
  Login,
  Register,
  ChatPage,
  WorkerRegister,
  SearchService,
} from '../pages';
import { Demandas } from '../pages/demandas';
import { Solicitacoes } from '../pages/solicitacoes';
import { ErrorBoundary } from './error-boundary';
import { NotFoundPage } from './not-found';
import { ProtectedRoute } from './protected-route-layout';

export function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" errorElement={<ErrorBoundary />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="login/register" element={<Register />} />
          <Route
            path="worker/register"
            element={
              <ProtectedRoute>
                <WorkerRegister />
              </ProtectedRoute>
            }
          />
          <Route
            path="demandas"
            element={
              <ProtectedRoute>
                <Demandas />
              </ProtectedRoute>
            }
          />
          <Route
            path="solicitacoes"
            element={
              <ProtectedRoute>
                <Solicitacoes />
              </ProtectedRoute>
            }
          />
          <Route path="search/service" element={<SearchService />} />
          <Route
            path="chat"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
