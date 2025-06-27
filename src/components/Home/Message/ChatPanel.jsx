import React, { useRef, useEffect } from 'react';

const messages = [
  { id: 1, fromMe: false, text: '你好，关于下午的会议，我们需要讨论一下议程安排', time: '10:15' },
  { id: 2, fromMe: true, text: '好的，我已经准备好相关材料了', time: '10:16' },
  { id: 3, fromMe: false, text: '我们 3 点在三楼会议室见面吧', time: '10:18' },
  { id: 4, fromMe: true, text: '好的，那我们下午 3 点会议室见', time: '10:20' },
];

const ChatPanel = () => {
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* 顶部聊天人信息 */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img src="https://mastergo.com/ai/api/search-image?query=A professional portrait photo of a young Asian woman with a gentle smile, wearing business attire, high-quality headshot style&width=80&height=80&orientation=squarish" className="w-10 h-10 rounded-full object-cover" alt="张雨晴" />
          <div>
            <h2 className="font-medium">张雨晴</h2>
            <p className="text-xs text-green-500">在线</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-gray-500">
          <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full !rounded-button">
            <i className="fas fa-ellipsis-v"></i>
          </button>
        </div>
      </div>
      {/* 消息列表 */}
      <div className="chat-messages flex-1 overflow-y-auto p-4 space-y-4 bg-white">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.fromMe ? 'justify-end' : 'justify-start'}`}>
            <div className={`message-bubble ${msg.fromMe ? 'bg-primary text-white' : 'bg-gray-100'} rounded-lg p-3 max-w-[70%]`}>
              <p className="text-sm break-words">{msg.text}</p>
              <p className={`text-xs mt-1 ${msg.fromMe ? 'text-gray-200' : 'text-gray-500'}`}>{msg.time}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* 输入区 */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-4 mb-2">
          <button className="text-gray-500 hover:text-gray-700 !rounded-button">
            <i className="far fa-smile text-xl"></i>
          </button>
          <div className="relative">
            <input type="file" id="fileInput" className="hidden" multiple />
            <button className="text-gray-500 hover:text-gray-700 !rounded-button" onClick={() => document.getElementById('fileInput').click()}>
              <i className="fas fa-paperclip text-xl"></i>
            </button>
          </div>
        </div>
        <div className="flex space-x-4">
          <textarea className="message-input flex-1 px-4 py-3 bg-gray-50 rounded-lg text-sm resize-none h-24 overflow-y-auto" placeholder="输入消息..." maxLength={2000}></textarea>
          <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 !rounded-button whitespace-nowrap h-fit">发送</button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel; 