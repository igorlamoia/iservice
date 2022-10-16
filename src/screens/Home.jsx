import React from 'react';
import Sidebar from '../components/chat/Sidebar';
import Chat from '../components/chat/Chat';

export function HomeChat() {
  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}
