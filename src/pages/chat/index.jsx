import React from 'react';
import Sidebar from '../../components/chat/Sidebar';
import Chat from '../../components/chat/Chat';

export default function ChatPage() {
  const [sideberOpen, setSideberOpen] = React.useState(false);
  return (
    <div className="home">
      <div className="container">
        {/* TODO - SIDEBAR responsiva */}
        <Sidebar sideberOpen={sideberOpen} setSideberOpen={setSideberOpen} />
        <Chat setSideberOpen={setSideberOpen} />
      </div>
    </div>
  );
}
