// ChatMessage.js
import React from 'react';

const ChatMessage = ({
    isAI,
    avatarIcon,
    content,
    details,
    timestamp,
    children
}) => {
    const formatTime = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        return date.toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (isAI) {
        return (
            <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center shadow-md">
                    <i className={`fas ${avatarIcon} text-white text-lg`}></i>
                </div>
                <div className="ml-4 mb-4 bg-gradient-to-br from-indigo-50 to-white p-6 rounded-2xl chat-message shadow-sm border border-indigo-100">
                    {children || (
                        <>
                            {content && (
                                <p className="text-gray-800 text-lg font-medium">{content}</p>
                            )}
                            {details && (
                                <p className="mt-4 text-gray-800">{details}</p>
                            )}
                            {timestamp && (
                                <div className="mt-2 text-xs text-gray-500">
                                    {formatTime(timestamp)}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        );
    }

    // 用户消息
    return (
        <div className="flex items-start justify-end">
            <div className="mr-4 mb-4 bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl chat-message shadow-sm border border-blue-200 max-w-[80%]">
                {children || (
                    <>
                        {content && (
                            <p className="text-gray-800 text-lg font-medium">{content}</p>
                        )}
                        {details && (
                            <p className="mt-4 text-gray-800">{details}</p>
                        )}
                        {timestamp && (
                            <div className="mt-2 text-xs text-gray-500 text-right">
                                {formatTime(timestamp)}
                            </div>
                        )}
                    </>
                )}
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center shadow-md">
                <i className="fas fa-user text-white text-lg"></i>
            </div>
        </div>
    );
};

export default ChatMessage;
