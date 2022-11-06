/* eslint-disable import/no-named-as-default */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ptBR } from 'date-fns/locale';

import './reset.css';
import './chat.scss';
import './index.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { ColorModeProvider } from './hooks/useTheme';
import { AuthContextProvider } from './hooks/context/AuthContext';
import { ChatContextProvider } from './hooks/context/ChatContext';
import { MyRoutes } from './routes';
import App from './app';
import { InteractivityContextProvider } from './hooks/context/interactivityContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ColorModeProvider>
      <AuthContextProvider>
        <ChatContextProvider>
          <InteractivityContextProvider>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={ptBR}
            >
              <App />
              <MyRoutes />
            </LocalizationProvider>
          </InteractivityContextProvider>
          {/* <RouterProvider router={routes} /> */}
        </ChatContextProvider>
      </AuthContextProvider>
    </ColorModeProvider>
  </React.StrictMode>
);
