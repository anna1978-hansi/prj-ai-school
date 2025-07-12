// ChatPanel.js
import React from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

const ChatPanel = ({
    messages = [],
    inputValue = '',
    onInputChange,
    onSendMessage,
    isTyping = false,
    chatEndRef
}) => {
    const handleSend = (message) => {
        if (onSendMessage) {
            onSendMessage(message);
        }
    };

    return (
        <div className="flex-1 bg-white rounded-lg shadow-sm p-4 flex flex-col">
            <div className="flex-1 overflow-y-auto mb-4" id="chatbox">
                <div className="flex flex-col space-y-4">
                    {messages.map((message) => (
                        <ChatMessage
                            key={message.id}
                            isAI={message.isAI}
                            avatarIcon={message.avatarIcon}
                            content={message.content}
                            details={message.details}
                            timestamp={message.timestamp}
                        />
                    ))}

                    {/* 打字指示器 */}
                    {isTyping && (
                        <div className="flex items-start">
                            <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center shadow-md">
                                <i className="fas fa-robot text-white text-lg"></i>
                            </div>
                            <div className="ml-4 mb-4 bg-gradient-to-br from-indigo-50 to-white p-6 rounded-2xl chat-message shadow-sm border border-indigo-100">
                                <div className="flex items-center space-x-2">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                    <span className="text-gray-500 text-sm">AI正在思考...</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 滚动到底部的锚点 */}
                    <div ref={chatEndRef} />
                </div>
            </div>
            <ChatInput
                value={inputValue}
                onChange={onInputChange}
                onSend={handleSend}
            />
        </div>
    );
};

export default ChatPanel;
