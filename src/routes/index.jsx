import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, Login, Register, ChatPage } from '../pages';
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
