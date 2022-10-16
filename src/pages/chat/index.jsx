import React from 'react';
import Sidebar from '../../components/chat/Sidebar';
import Chat from '../../components/chat/Chat';

export default function ChatPage() {
  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}
