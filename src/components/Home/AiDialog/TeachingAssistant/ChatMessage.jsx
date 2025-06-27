// ChatMessage.js
import React from 'react';

const ChatMessage = ({ isAI, avatarIcon, message, children }) => {
    if (isAI) {
        return (
            <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center shadow-md">
                    <i className={`fas ${avatarIcon} text-white text-lg`}></i>
                </div>
                <div className="ml-4 mb-4 bg-gradient-to-br from-indigo-50 to-white p-6 rounded-2xl chat-message shadow-sm border border-indigo-100">
                    {children}
                </div>
            </div>
        );
    }

    // 用户消息的样式可以后续添加
    return null;
};

export default ChatMessage;
