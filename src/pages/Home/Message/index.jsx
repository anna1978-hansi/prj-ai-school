import React from 'react';
import ContactsSidebar from '@/components/Home/Message/ContactsSidebar';
import ChatPanel from '@/components/Home/Message/ChatPanel';

const Message = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="chat-container w-[1200px] flex rounded-lg overflow-hidden bg-white shadow-lg">
        <ContactsSidebar />
        <ChatPanel />
      </div>
    </div>
  );
};

export default Message; 