/* eslint-disable import/no-named-as-default */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './reset.css';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import routes from './routes';
import { ColorModeProvider } from './hooks/useTheme';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ColorModeProvider>
      <RouterProvider router={routes} />
    </ColorModeProvider>
  </React.StrictMode>
);
