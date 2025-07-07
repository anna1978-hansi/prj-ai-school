import React from 'react';
import ContactsSidebar from '@/components/Home/Message/ContactsSidebar';
import ChatPanel from '@/components/Home/Message/ChatPanel';

const Message = () => {
  return (

    <div className="  flex justify-center items-start py-8 px-4 ">
      <div
        className="chat-container w-[75vw]  h-[80vh] flex rounded-xl overflow-hidden bg-white shadow-lg"
      >
        <ContactsSidebar />
        <ChatPanel />
      </div>
    </div>

  );
};

export default Message; 