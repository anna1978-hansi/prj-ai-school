import React, { useRef, useEffect, useState } from 'react';

const ChatPanel = ({ selectedContact, onSendMessage }) => {
  const messagesEndRef = useRef(null);
  const [messageText, setMessageText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedContact?.messages]);

  // 处理发送消息
  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedContact) return;

    onSendMessage(messageText);
    setMessageText('');
  };

  // 处理回车键发送
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 处理输入框变化
  const handleInputChange = (e) => {
    setMessageText(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  // 如果没有选中联系人，显示空状态
  if (!selectedContact) {
    return (
      <div className="flex-1 flex flex-col bg-white">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <i className="fas fa-comments text-4xl mb-4"></i>
            <p>选择一个联系人开始聊天</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* 顶部聊天人信息 */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img src={selectedContact.avatar} className="w-10 h-10 rounded-full object-cover" alt={selectedContact.name} />
          <div>
            <h2 className="font-medium">{selectedContact.name}</h2>
            <p className={`text-xs ${selectedContact.online ? 'text-green-500' : 'text-gray-500'}`}>
              {selectedContact.online ? '在线' : '离线'}
            </p>
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
        {selectedContact.messages && selectedContact.messages.length > 0 ? (
          selectedContact.messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.fromMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`message-bubble ${msg.fromMe ? 'bg-primary text-white' : 'bg-gray-100'} rounded-lg p-3 max-w-[70%]`}>
                <p className="text-sm break-words">{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.fromMe ? 'text-gray-200' : 'text-gray-500'}`}>{msg.time}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            <i className="fas fa-comment-dots text-2xl mb-2"></i>
            <p>还没有消息，开始聊天吧！</p>
          </div>
        )}
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
          <textarea
            className="message-input flex-1 px-4 py-3 bg-gray-50 rounded-lg text-sm resize-none h-24 overflow-y-auto"
            placeholder="输入消息..."
            maxLength={2000}
            value={messageText}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          ></textarea>
          <button
            className={`px-6 py-2 rounded-lg !rounded-button whitespace-nowrap h-fit transition-colors ${messageText.trim() && selectedContact
                ? 'bg-primary text-white hover:bg-primary/90'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            onClick={handleSendMessage}
            disabled={!messageText.trim() || !selectedContact}
          >
            发送
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel; 