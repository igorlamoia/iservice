/* eslint-disable import/no-named-as-default */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './reset.css';
import './chat.scss';
import './index.css';
import { RouterProvider } from 'react-router-dom';
// import routes from './routes';
import { ColorModeProvider } from './hooks/useTheme';
import { AuthContextProvider } from './hooks/context/AuthContext';
import { ChatContextProvider } from './hooks/context/ChatContext';
import { MyRoutes } from './routes';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ColorModeProvider>
      <AuthContextProvider>
        <ChatContextProvider>
          <MyRoutes />
          {/* <RouterProvider router={routes} /> */}
        </ChatContextProvider>
      </AuthContextProvider>
    </ColorModeProvider>
  </React.StrictMode>
);
