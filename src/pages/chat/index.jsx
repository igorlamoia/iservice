import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import LeftSidebar from '../../components/chat/left-sidebar';
import Chat from '../../components/chat/chat-selected';

export default function ChatPage() {
  const [sideberOpen, setSideberOpen] = React.useState(true);
  const theme = useTheme();
  const celular = useMediaQuery(theme.breakpoints.down('sm'));
  const drawerWidth = celular ? '0px' : '330px';

  return (
    <Box>
      <div className="container">
        {/* TODO - LeftSidebar responsiva */}
        <LeftSidebar
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
