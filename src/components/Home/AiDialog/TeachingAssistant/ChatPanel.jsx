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
