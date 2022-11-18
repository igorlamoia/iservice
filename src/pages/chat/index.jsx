import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Sidebar from '../../components/chat/sidebar';
import Chat from '../../components/chat/chat-selected';

export default function ChatPage() {
  const [sideberOpen, setSideberOpen] = React.useState(false);
  const theme = useTheme();
  const celular = useMediaQuery(theme.breakpoints.down('sm'));
  const drawerWidth = celular ? '0px' : '400px';

  return (
    <Box>
      <div className="container">
        {/* TODO - SIDEBAR responsiva */}
        <Sidebar
          sideberOpen={sideberOpen}
          setSideberOpen={setSideberOpen}
          celular={celular}
          drawerWidth={drawerWidth}
        />
        <Chat setSideberOpen={setSideberOpen} drawerWidth={drawerWidth} />
      </div>
    </Box>
  );
}
