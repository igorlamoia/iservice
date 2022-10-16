import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, Login, Registration } from '../pages';
import { HomeChat } from '../screens/Home';
import { LoginChat } from '../screens/Login';
import { RegisterChat } from '../screens/Register';
import { ErrorBoundary } from './error-boundary';
import { NotFoundPage } from './not-found';
import { ProtectedRouteLayout } from './protected-route-layout';

export function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            errorElement={<ErrorBoundary />}
            element={
              <ProtectedRouteLayout>
                <HomeChat />
              </ProtectedRouteLayout>
            }
          />
          <Route path="login" element={<LoginChat />} />
          <Route path="register" element={<RegisterChat />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
