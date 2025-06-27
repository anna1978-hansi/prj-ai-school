// ChatPanel.js
import React from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

const ChatPanel = () => {
    return (
        <div className="flex-1 bg-white rounded-lg shadow-sm p-4 flex flex-col">
            <div className="flex-1 overflow-y-auto mb-4" id="chatbox">
                <div className="flex flex-col space-y-4">
                    <ChatMessage isAI={true} avatarIcon="fa-robot">
                        <p className="text-gray-800 text-lg font-medium">您好！我是AI智能助手</p>
                        <p className="mt-4 text-gray-800">我可以为您提供个性化的教学建议和资源。</p>
                        <p className="mt-4 text-gray-800">请问您需要什么帮助？</p>
                    </ChatMessage>
                    {/* 更多聊天消息会在这里渲染 */}
                </div>
            </div>
            <ChatInput />
        </div>
    );
};

export default ChatPanel;
